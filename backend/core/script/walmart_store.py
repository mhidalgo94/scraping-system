import requests
from bs4 import BeautifulSoup
from datetime import datetime

from core.data_scraping.models import WalmartModel, LogRequestModel


class WalmartWebScraping:
    URL_BASE = 'https://www.walmart.com/'
    HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0',
    "Accept-Language": "en-US, en;q=0.5"
    }
    all_product = []
    
    response_status_code = []
    response_headers = []
    response_content = []
    
    def __init__(self,search: str, pagination: int=1):
        self.search = search
        self.pages = pagination
        self.URLS = self.get_urls(self.pages)

    def run(self):
        self.send_requests(self.pages)
        return self.all_product


    def get_article(self):
        return self.search.replace(" ","+")


    def create_url(self,page):
        return f'{self.URL_BASE}/search?q={self.get_article()}&page={page}'


    def get_urls(self,pages):
        urls = []
        for url in range(1,pages+1):
            url = self.create_url(pages)
            urls.append(url)
        return urls


    def send_requests(self,pages):
        for page in range(1, pages+1):
            url = self.create_url(page)
            response = requests.get(url,headers=self.HEADERS,timeout=2)
            self.response_status_code.append(response.status_code)
            self.response_content.append(response.content)
            self.response_headers.append(response.headers)
            self.scraping_context(response, url ,page)

    def scraping_context(self,response,url_page,page):
        
        doc = BeautifulSoup(response.text, 'lxml')

        results = doc.find("div",{"class":"flex flex-wrap w-100 flex-grow-0 flex-shrink-0 ph2 pr0-xl pl4-xl mt0-xl mt3"})
        
        for result in results:
            data = {}
            link_container = result.find('a')
            # Title product
            data["title"] = link_container.span.text
            # url product
            link_product = link_container["href"]
            if 'www.walmart.com' not in link_product:
                link_product = 'https://www.walmart.com' + link_product
            data['url_product'] = link_product
            # Detail product
            info_container = result.find('div',{"data-testid":"list-view"})
            data['image'] = info_container.img['src']
            
            # Rate product
            div_rate =info_container.find('div',{'class':'flex items-center mt2'})
            if div_rate != None:
                rate_text = div_rate.find('span',{'class':'w_Bl'}).text
                list_rate_text = rate_text.split()
                data['rate'] = f'{list_rate_text[0]}/{list_rate_text[3]}'

            price_box = info_container.find('div',{'data-automation-id':'product-price'})
            price_children = price_box.findChildren()
            if len(price_children) <=2:
                price_string =price_children[0].text
                price = price_string[price_string.index('$')+1:]
                old_price = 0
            elif len(price_children) > 3:
                price_text = price_children[0].text
                price = price_text[price_text.index('$')+1:]
                old_price_text = price_children[2].text
                old_price = old_price_text[old_price_text.index('$')+1:]
            
            data['price'] = price
            data['old_price'] = old_price

            data['status_code']  = int(response.status_code)
            data['page'] = int(page)
            data['url_page'] = url_page
            date = datetime.strptime(response.headers['Date'],'%a, %d %b %Y %H:%M:%S GMT')
            data['date_request']  = date
            self.all_product.append(data)

        
    def __repr__(self) -> str:
        return self.response_status_code

     
def ejecut_scraping_Walmart(search, page):
    scraping = WalmartWebScraping(search.search_title, page).run()
    bulk_list_registro = list()
    for obj in scraping:
        LogRequestModel.objects.get_or_create(
            search_request=search,
            status_code_request=obj['status_code'],
            date_request=obj['date_request'],
            page=obj['page'],
            url_page = obj['url_page']
        )
        
        if 'rate' in obj:
            rate = obj['rate']
        else:
            rate = ""

        registro = WalmartModel(
            search=search,
            page=obj['page'],
            product=obj['title'],
            img=obj['image'],
            url_product=obj['url_product'],
            rate=rate,
            price=obj['price'],
            old_price=obj['old_price']
        )
        bulk_list_registro.append(registro)

    WalmartModel.objects.bulk_create(bulk_list_registro)
    return search







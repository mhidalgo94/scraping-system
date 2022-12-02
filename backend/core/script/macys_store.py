import requests
from bs4 import BeautifulSoup
from datetime import datetime

from core.data_scraping.models import MacysModel, LogRequestModel

class MacysWebScraping:
    URL_BASE = 'https://www.macys.com'
    HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    }
    all_product = []
    
    response_status_code = []
    response_headers = []
    response_content = []
    
    def __init__(self,search: str, pagination:int=1):
        self.search = search
        self.pages = pagination
        self.URLS = self.get_urls(self.pages)

    def run(self):
        self.send_requests(self.pages)
        return self.all_product


    def get_article(self):
        return self.search.replace(" ","+")


    def create_url(self,page):
        return f'{self.URL_BASE}/shop/search?keyword={self.get_article()}'

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

        list_products_container = doc.find_all('div',{'class':'productThumbnail redesignEnabled'})

        for product in list_products_container:
            data= {}
            title = product.a['title']
            link_product = f'https://www.macys.com{product.a["href"]}'

            prices_original = product.find('span',{'class':'regular originalOrRegularPriceOnSale'})
            regular = product.find('span',{'class':'regular'})
            discount = product.find('span',{'class':'discount'})
            
            if regular != None:
                regular = regular.text.strip()
            if prices_original != None:
                prices_original = prices_original.text.strip()

            if discount != None:
                price = discount.text.strip()
                old_price = regular or prices_original
            else:
                price = regular or prices_original
                old_price = 0

            if product.img['data-lazysrc']:
                image = product.img['data-lazysrc']
            else:
                image = product.img['src']

            rate = product.find('span',{'class':'filled-stars'})
            if rate != None:
                str_rate = rate['style'].split(':')
                rate_ = float(str_rate[1][:-1])/10/2
                rate = f'{round(rate_,2)}/5'
            else:
                rate = ""

            data['title'] = title
            data['url_article'] = link_product
            data['image'] = image
            data['price'] = price
            data['old_price'] = old_price
            data['rate'] = rate

            
            data['status_code']  = int(response.status_code)
            data['page'] = int(page)
            data['url_page'] = url_page
            date = datetime.strptime(response.headers['Date'],'%a, %d %b %Y %H:%M:%S GMT')
            data['date_request']  = date
            self.all_product.append(data)

        
def ejecut_scraping_Macys(search, page):
    scraping = MacysWebScraping(search.search_title, page).run()
    bulk_list_registro = list()
    for obj in scraping:
        LogRequestModel.objects.get_or_create(
            search_request=search,
            status_code_request=obj['status_code'],
            date_request=obj['date_request'],
            page=obj['page'],
            url_page = obj['url_page']
        )

        registro = MacysModel(
            search=search,
            page=obj['page'],
            product=obj['title'],
            img=obj['image'],
            url_product=obj['url_article'],
            rate=obj['rate'],
            price=obj['price'],
            old_price=obj['old_price']
        )
        bulk_list_registro.append(registro)

    MacysModel.objects.bulk_create(bulk_list_registro)
    return search
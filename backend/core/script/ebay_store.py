import requests
from bs4 import BeautifulSoup
from datetime import datetime

from core.data_scraping.models import EbayModel, LogRequestModel

class EbayWebScraping:
    URL_BASE = 'https://www.ebay.com'
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
        return f'{self.URL_BASE}/sch/i.html?_nkw={self.get_article()}&_pgn={page}'

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

        # tengo que revisar porque no encuentra los valores de ul ni li en este html parse
        div_search = doc.find(id='srp-river-results')
        # div_search = doc.find('div', {'class': 'srp-river-results'}).find('ul')
        # ul_items = div_search.find("ul")
        # ul_items = div_search.find(class_='srp-results')
        li_items = div_search.find_all("li")[1:-3]

        for item in li_items:
            data = {}
            h3_title = item.find(class_='s-item__title')
            url_product = item.find(class_="s-item__link")
            img_url = item.find(class_='s-item__image-img')
            price = item.find(class_='s-item__price')
            rate = item.find(class_='x-star-rating')
            top_rated = item.find(class_="s-item__etrs-text")
            if h3_title and img_url and price and url_product:
                data['title'] = h3_title.text
                data['url_article'] = url_product['href']
                data['image'] = img_url['src']

                if rate:
                    rat = rate.span.text.split(" ")
                    rate_string = rat[0] + "/" + rat[3]
                    data['rate']= rate_string

                if top_rated:
                    data['top_rate'] = True
                else:
                    data['top_rate'] = False

                if 'see price' in price.text.lower():
                    data['price'] = 0
                    data['old_price'] = 0
                elif 'to' in price.text:
                    price = price.text.split("to")
                    data['price'] = float(price[0].replace("$", "").replace(",",""))
                    data['old_price'] = float(price[1].replace("$", "").replace(",",""))
                else:
                    data['price'] = float(price.text.replace("$", "").replace(",",""))
                    data['old_price'] = 0

            
                data['status_code']  = int(response.status_code)
                data['page'] = int(page)
                data['url_page'] = url_page
                date = datetime.strptime(response.headers['Date'],'%a, %d %b %Y %H:%M:%S GMT')
                data['date_request']  = date

                self.all_product.append(data)

        
def ejecut_scraping_Ebay(search, page):
    scraping = EbayWebScraping(search.search_title, page).run()
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

        registro = EbayModel(
            search=search,
            page=obj['page'],
            product=obj['title'],
            img=obj['image'],
            url_product=obj['url_article'],
            rate=rate,
            price=obj['price'],
            old_price=obj['old_price']
        )
        bulk_list_registro.append(registro)

    EbayModel.objects.bulk_create(bulk_list_registro)
    return search



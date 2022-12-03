import requests
from bs4 import BeautifulSoup
from datetime import datetime

from core.data_scraping.models import SearchUserModel,EtsyModel, LogRequestModel


class EtsyWebScraping:
    URL_BASE = 'https://www.etsy.com'
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
        
        div_container_product = doc.find("ol",{"class":"wt-grid wt-grid--block wt-pl-xs-0 tab-reorder-container"})
        list_product = div_container_product.find_all("li")[:11]
        for product in list_product:
            data={}
            data['image'] = product.img['src']
            data['title'] = str(product.h3.text[3:-3]).strip()
            p_price = product.find('p', {'class':'wt-text-title-01 lc-price'})
            price = p_price.find('span',{'class':'currency-value'}).text
            p_old_price = product.find('span',{'class':'wt-text-strikethrough','aria-hidden':'true'})
            if p_old_price != None:
                old_price = p_old_price.find('span',{'class':'currency-value'}).text
            else:
                old_price = 0
            
            tag_rate = product.find('input',{'name':'rating'})
            if tag_rate:
                value_rate = tag_rate['value']
                rate = f'{value_rate}/5'
            else:
                rate = '0/5'

            link_tag = product.find('a')
            link_product = link_tag['href']
            data['url_product'] = link_product
            data['price'] = price
            data['old_price'] = old_price
            data['status_code']  = int(response.status_code)
            data['rate'] = rate
            data['page'] = int(page)
            data['url_page'] = url_page
            date = datetime.strptime(response.headers['Date'],'%a, %d %b %Y %H:%M:%S GMT')
            data['date_request']  = date
            self.all_product.append(data)

        
    def __repr__(self) -> str:
        return self.response_status_code

        
def ejecut_scraping_Etsy(search, page):
    scraping = EtsyWebScraping(search.search_title, page).run()
    bulk_list_registro = list()
    for obj in scraping:
        LogRequestModel.objects.get_or_create(
            search_request=search,
            status_code_request=obj['status_code'],
            date_request=obj['date_request'],
            page=obj['page'],
            url_page = obj['url_page']
        )

        registro = EtsyModel(
            search=search,
            page=obj['page'],
            product=obj['title'],
            img=obj['image'],
            url_product=obj['url_product'],
            rate=obj['rate'],
            price=obj['price'],
            old_price=obj['old_price']
        )
        bulk_list_registro.append(registro)

    EtsyModel.objects.bulk_create(bulk_list_registro)
    return search

# def ejecut_scraping_Etsy(search, page,company, user,task_id=None):
#     scraping = EtsyWebScraping(search, page).run()
#     bulk_list_registro = list()
#     search = SearchUserModel.objects.create(search_title=search, mont_page=page, user=user,company=company,task_id=task_id)
#     for obj in scraping:
#         LogRequestModel.objects.get_or_create(
#             search_request=search,
#             status_code_request=obj['status_code'],
#             date_request=obj['date_request'],
#             page=obj['page'],
#             url_page = obj['url_page']
#         )
        
#         registro = EtsyModel(
#             search=search,
#             page=obj['page'],
#             product=obj['title'],
#             img=obj['image'],
#             url_product=obj['url_article'],
#             rate=obj['rate'],
#             price=obj['price']
#         )
#         bulk_list_registro.append(registro)

#     EtsyModel.objects.bulk_create(bulk_list_registro)
#     return search
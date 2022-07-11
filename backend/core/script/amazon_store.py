import requests
from bs4 import BeautifulSoup
from datetime import datetime

from core.data_scraping.models import SearchUserModel,LogRequestModel, AmazonModel


class AmazonWebScraping:
    URL_BASE = 'https://www.amazon.com'
    HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
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
        return f'{self.URL_BASE}/s?k={self.get_article()}&page={page}'


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

        results = doc.find_all("div",{"class":"s-result-item","data-component-type":"s-search-result"})
        
        for result in results:
            data = {}
            data["title"] = str(result.h2.text).strip()
            data['image'] = result.img['src']
            rate = result.find("span",{"class":"a-icon-alt"})
            url_article = result.find("a",{"class":"a-link-normal"})
            data['url_article'] = f'https://www.amazon.com{url_article["href"]}'
            if rate:
                rate = rate.text.split(" ")
                rate = rate[0]+"/"+rate[3]
                data['rate'] = rate
            else:
                rate = ""

            price = result.find("span", {"class":"a-offscreen"})
            if price:
                price = price.text
                data['price'] = float(price.replace("$","").replace(",",""))
            else:
                data['price'] = 0
            

            data['status_code']  = int(response.status_code)
            data['page'] = int(page)
            data['url_page'] = url_page
            date = datetime.strptime(response.headers['Date'],'%a, %d %b %Y %H:%M:%S GMT')
            data['date_request']  = date
            
            self.all_product.append(data)

        
    def __repr__(self) -> str:
        return self.response_status_code



def ejecut_scraping_Amazon(search, page,company, user):
    scraping = AmazonWebScraping(search, page).run()
    bulk_list_registro = list()
    search = SearchUserModel.objects.create(search_title=search, mont_page=page, user=user)
    for obj in scraping:
        LogRequestModel.objects.get_or_create(
            search_request=search,
            status_code_request=obj['status_code'],
            date_request=obj['date_request'],
            page=obj['page'],
            url_page = obj['url_page'],
            company=company
        )
        
        if 'rate' in obj:
            rate = obj['rate']
        else:
            rate = ""


        registro = AmazonModel(
            search=search,
            page=obj['page'],
            product=obj['title'],
            img=obj['image'],
            url_product=obj['url_article'],
            rate=rate,
            price=obj['price']
        )
        bulk_list_registro.append(registro)

        AmazonModel.objects.bulk_create(bulk_list_registro)



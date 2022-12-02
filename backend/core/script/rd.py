import redis


print('start conection')
r = redis.Redis(host='localhost', port=6379, db=0)

setter = r.set('foo', 'bar')
getter = r.get('foo')

print(setter,getter)


# doc = doc.find("div",{"class":"flex flex-wrap w-100 flex-grow-0 flex-shrink-0 ph2 pr0-xl pl4-xl mt0-xl mt3"})

# results = doc.find_all("div",{"class":"mb1 ph1 pa0-xl bb b--near-white w-25"})
# for result in results:
#     # data = {}
#     link_container = result.find('a')
#     article_text = link_container.span.text
#     link_article = link_container["href"]
#     if 'www.walmart.com' not in link_article:
#         link_article = 'https://www.walmart.com' + link_article

#     info_container = result.find('div',{"data-testid":"list-view"})
#     img = info_container.img['src']
#     price_box = info_container.find('div',{'data-automation-id':'product-price'})
#     price_children = price_box.findChildren()
#     if len(price_children) <=2:
#         price_string =price_children[0].text
#         price = price_string[price_string.index('$')+1:]
#         old_price = 0
#     elif len(price_children) > 3:
#         price_text = price_children[0].text
#         price = price_text[price_text.index('$')+1:]
#         old_price_text = price_children[2].text
#         old_price = old_price_text[old_price_text.index('$')+1:]

#     div_rate =info_container.find('div',{'class':'flex items-center mt2'})
#     if div_rate != None:
#         rate_text = div_rate.find('span',{'class':'w_Bl'}).text
#         list_rate_text = rate_text.split()
#         rate = f'{list_rate_text[0]}/{list_rate_text[3]}'
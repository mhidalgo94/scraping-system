from django.shortcuts import render

from django.views.generic import View

from core.script.amazon_store import ejecut_scraping_Amazon
from core.script.ebay_store import ejecut_scraping_Ebay



class HomeView(View):
    template_name = "index.html"

    def get(self,request):
        

        return render(request,'index.html')

    def post(self,request):
        context = {}
        search = request.POST['search']
        pages = request.POST['pages']
        company = request.POST['company']
        if search and pages and company:
            if company == 'ebay':
                ejecut_scraping_Ebay(search, int(pages), company,request.user)
                context['mensaje'] = f'Ejecucion terminada Articulo: {search}--Paginacion: {pages}-- Compania: {company}'
            elif company == 'amazon':
                ejecut_scraping_Amazon(search, int(pages), company,request.user)
                context['mensaje'] = f'Ejecucion terminada Articulo: {search}--Paginacion: {pages}-- Compania: {company}'
                
        else:
            context['mensaje'] = f'Envie los parametros necesarios'
        
        return render(request,'index.html', context=context)

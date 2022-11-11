
from django.shortcuts import render
from django.views.generic import View, TemplateView
from django.http import JsonResponse
from datetime import datetime, timedelta
from celery.result import AsyncResult
from time import sleep
from core.script.amazon_store import ejecut_scraping_Amazon
from core.script.ebay_store import ejecut_scraping_Ebay

from .task import schedule_scraping_task

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


class TestCelery(TemplateView):
    template_name = 'index2.html'

    def post(self,request, *args,**kwargs):
        dic = {}
        dic['company']='ebay'
        dic['search']= 'microfonos'
        dic['desc'] = 'busqueda para microfonos'
        dic['pages']= 1
        dic['user_id']= request.user.id
        conteo = datetime.utcnow()  + timedelta(seconds=10)
        result = schedule_scraping_task.apply_async((4,2),eta=conteo)
        status_task = AsyncResult(result.id)
        status_task = {
             "task_id": result.id,
            "task_status": status_task.status,
            "task_result": status_task.result
        }

        return JsonResponse(status_task)
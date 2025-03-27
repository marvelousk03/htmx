from django.urls import path
from . import views

app_name = 'project_tut'
urlpatterns = [
    path('example/', views.example, name='example'),
    path('sample-post/', views.sample_post, name='sample-post'),
]
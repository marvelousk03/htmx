from . import views
from django.urls import path

app_name = 'project_tut'
urlpatterns = [
    path('example/', views.example, name='example'),
    path('sample-post/', views.sample_post, name='sample-post'),
]
from django.urls import path
from . import views

urlpatterns = [
    path ('',views.Home, name= "home"),
    path ('acerca/', views.acerca, name="acerca" ),
    path ('hello/<str:username>',views.hello, name="hello"), #para recibir como parametro un string, se usa el str
    #path ('hello/<int:id>',views.hello) #para recibir como parametro un numero, se usa el int
    path ('proyectos/', views.project, name="proyectos" ),
    path ('tareas/', views.tareas, name="tareas" ),
    path ('creartareas/', views.crearTareas, name= "crearTareas"),
    path ('eliminartareas/<int:id>', views.deletetask, name= "deleteTask"),
    path ('crear-proyecto/', views.createProject, name="CrearProject"),
    path ('proyectos/<int:id>', views.detailsProject, name="detailsProject"),
]

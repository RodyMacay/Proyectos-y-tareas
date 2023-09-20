
from django.http import HttpResponse, JsonResponse
from .models import Project, Tareas
from django.shortcuts import get_object_or_404, render, redirect
from .forms import CreateNewTask, CreateNewProject
from django.views.decorators.csrf import csrf_exempt
import json

def Home (resquest):
    titulo= 'Django!!!!'
    return render(resquest, 'index.html', {
        'titulo': titulo
    })
def hello(resquest, username):
    print(username)
    return render("<h1>Hola %s </h1>" % username)
#def hello(resquest,id ):
    #print (type (id))
  #  r= ("Tu id es",id)
    #print(r)
    #return HttpResponse("<h1> HOLA MUNDO %s</h1>" % id)

def acerca (resquest):
    return render(resquest, 'acerca.html')

def project (resquest):
    projects = Project.objects.all()
    p= list(projects)
    project_json= [{'id':project.id,'nombre': project.nombre} for project in p]
    return JsonResponse ({'Proyectos': project_json})
def tareas(request):
    tareas_queryset = Tareas.objects.all()
    tareas_list = list(tareas_queryset)
    
    # Serializar los datos como JSON y devolverlos en la respuesta
    tareas_json = [{'id':tarea.id,'titulo': tarea.titulo, 'descripcion': tarea.descripcion,
                     'done': tarea.done} for tarea in tareas_list]
    
    return JsonResponse({'tareas': tareas_json})

@csrf_exempt
def crearTareas(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            titulo = data.get('titulo', '')
            descripcion = data.get('descripcion', '')
            
            if titulo and descripcion:
                Tareas.objects.create(titulo=titulo, descripcion=descripcion, project_id=2)
                return JsonResponse({'message': 'Tarea creada exitosamente'})
            else:
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Error en el formato JSON de la solicitud'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


def createProject (resquest):
    if resquest.method == 'GET':
        return render (resquest, 'projects/createProject.html', {
            'form': CreateNewProject
        })
    else:
        Project.objects.create(nombre = resquest.POST ['name'])
        return redirect ("proyectos")
    
def detailsProject (resquest, id):
    project = get_object_or_404(Project, id=id)
    tareas = Tareas.objects.filter(project_id=id)
    return render(resquest, 'projects/detailsProject.html',{
        'project': project,
        'tareas': tareas
    })

@csrf_exempt
def deletetask (resquest, id):
    try:
        tarea = get_object_or_404(Tareas, id=id)
        tarea.delete()
        return JsonResponse ({'message': "La tarea fue eliminada exitosamente"})
    except Tareas.DoesNotExist:
        return JsonResponse({'message' :"La tarea no existe"}, status=404)


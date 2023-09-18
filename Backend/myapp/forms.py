from django import forms

class CreateNewTask(forms.Form):
    title = forms.CharField(label='Titulo de tarea', max_length=200)
    description = forms.CharField( widget=forms.Textarea, label=" Descripcion de tarea", required=False)

class CreateNewProject (forms.Form):
    name = forms.CharField (label= "nombre del Proyecto", max_length=100)
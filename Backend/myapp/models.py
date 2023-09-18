from django.db import models

# Create your models here.
class Project (models.Model):
    nombre = models.CharField(max_length=200)
    def __str__(self) -> str:
        return self.nombre

class Tareas(models.Model):
    titulo = models.CharField (max_length=200)
    descripcion = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE) #cuando elimine un proyecto, en casacada se elimanan los demas datos en el que esten relaciondos
    done = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.titulo + '-' + self.project.nombre
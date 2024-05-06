from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm 
from .form import CustomUserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Utilisateur

# Create your views here.
def get_current_page_index(request):
    return request.session.get('current_page_index', 0)

def set_current_page_index(request, index):
    request.session['current_page_index'] = index

def UpdateHistorySession(request, view_name):
    if 'history' in request.session:
        if view_name != request.session['history'][-1]:
            request.session['history'] = request.session.get('history', [])[:get_current_page_index(request)+1][-2:] + [view_name]
            set_current_page_index(request, len(request.session['history'])-1)
    else:
        request.session['history'] = [view_name]

def page_principale(request):
    x={'picture':'Figure MD 01','title':'Moteur Diesel','title_web_page':'Moteur disel'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'page_principale')
    return render(request,'utilisateur/page_principale.html',x)

def circuit_du_gazoil(request):
    x={'picture':'Figure MD 02','title':'Circuit du gazoil','title_web_page':'Circuit du gazoil'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'circuit_du_gazoil')
    return render(request,'utilisateur/circuit_du_gazoil.html',x)

def circuit_eau_de_mer(request):
    x={'picture':'Figure MD 03','title':'Circuit eau de mer','title_web_page':'Circuit eau de mer'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'circuit_eau_de_mer')
    return render(request,'utilisateur/circuit_eau_de_mer.html',x)


def palliers_et_cylinders(request):
    x={'picture':'Figure MD 04','title':'Température des palliers et cylindres','title_web_page':'Température des palliers et cylindres'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'palliers_et_cylinders')
    return render(request,'utilisateur/palliers_et_cylinders.html',x)


def temperature_d_echapement_des_cylindres(request):
    x={'picture':'Figure MD 05','title':'Température échappement des cylindres','title_web_page':'Température échappement des cylindres'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'temperature_d_echapement_des_cylindres')
    return render(request,'utilisateur/temperature_d_echapement_des_cylindres.html',x)


def temperature_des_palliers(request):
    x={'picture':'Figure MD 06','title':'Température des paliers','title_web_page':'Température des paliers'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'temperature_des_palliers')
    return render(request,'utilisateur/temperature_des_palliers.html',x)


def tableau_des_variable(request):
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'tableau_des_variable')
    return render(request,'utilisateur/tableau_des_variable.html')


""" *********************** Partie Formateur **************** """

def page_principale_formateur(request):
    x={'picture':'Figure MD 01','title':'Moteur Diesel','title_web_page':'Moteur disel'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'page_principale_formateur')
    return render(request,'formateur/page_principale_formateur.html',x)

def circuit_du_gazoil_formateur(request):
    x={'picture':'Figure MD 02','title':'Circuit du gazoil','title_web_page':'Circuit du gazoil'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'circuit_du_gazoil_formateur')
    return render(request,'formateur/circuit_du_gazoil_formateur.html',x)

def circuit_eau_de_mer_formateur(request):
    x={'picture':'Figure MD 03','title':'Circuit eau de mer','title_web_page':'Circuit eau de mer'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'circuit_eau_de_mer_formateur')
    return render(request,'formateur/circuit_eau_de_mer_formateur.html',x)


def palliers_et_cylinders_formateur(request):
    x={'picture':'Figure MD 04','title':'Température des palliers et cylindres','title_web_page':'Température des palliers et cylindres'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'palliers_et_cylinders_formateur')
    return render(request,'formateur/palliers_et_cylinders_formateur.html',x)


def temperature_d_echapement_des_cylindres_formateur(request):
    x={'picture':'Figure MD 05','title':'Température échappement des cylindres','title_web_page':'Température échappement des cylindres'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'temperature_d_echapement_des_cylindres_formateur')
    return render(request,'formateur/temperature_d_echapement_des_cylindres_formateur.html',x)


def temperature_des_palliers_formateur(request):
    x={'picture':'Figure MD 06','title':'Température des paliers','title_web_page':'Température des paliers'}
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'temperature_des_palliers_formateur')
    return render(request,'formateur/temperature_des_palliers_formateur.html',x)


def tableau_des_variable_formateur(request):
    if request.GET.get("refer") not in ["back", "forward"]:
        UpdateHistorySession(request, 'tableau_des_variable_formateur')
    return render(request,'formateur/tableau_des_variable_formateur.html')


"""  ************************  fouter ********************************** """

def fouter(request):
    return render(request,'formateur/fouter.html')



"""   ******************************************************************* """

def back(request):
    if not request.session.get('history'):
        return redirect(request.META.get('HTTP_REFERER'))
    if get_current_page_index(request) > 0:
        set_current_page_index(request, get_current_page_index(request) - 1)

    return redirect(f"{reverse(request.session.get('history')[get_current_page_index(request)])}?refer=back")

def forward(request):
    if not request.session.get('history'):
        return redirect(request.META.get('HTTP_REFERER'))
    if get_current_page_index(request) + 1 < len(request.session.get('history', [])):
        set_current_page_index(request, get_current_page_index(request) + 1)

    return redirect(f"{reverse(request.session.get('history')[get_current_page_index(request)])}?refer=forward")

""" **********************************  Connexion ********************************* """

def connexion(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if username == "@formateur" and password=="Motarau01":
                return redirect('page_principale_formateur')
            elif username == "@utilisateur" and password=="GafaVoyk3":
                return redirect('page_principale')
        
        else:
            messages.error(request, 'Nom d\'utilisateur ou mot de passe incorrect.')
            return redirect('connexion')
    return render(request, 'connexion/connexion.html')



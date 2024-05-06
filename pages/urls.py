from django.urls import path
from . import views

urlpatterns=[
    path('page_principale/',views.page_principale, name='page_principale'),
    path('circuit_du_gazoil/',views.circuit_du_gazoil, name='circuit_du_gazoil'),
    path('circuit_eau_de_mer/',views.circuit_eau_de_mer, name='circuit_eau_de_mer'),
    path('palliers_et_cylinders/',views.palliers_et_cylinders, name='palliers_et_cylinders'),
    path('temperature_des_palliers/',views.temperature_des_palliers, name='temperature_des_palliers'),
    path('temperature_d_echapement_des_cylindres/',views.temperature_d_echapement_des_cylindres, name='temperature_d_echapement_des_cylindres'),
    path('tableau_des_variable/',views.tableau_des_variable, name='tableau_des_variable'),
    
    # *********** formateur ************
    
    path('page_principale_formateur/',views.page_principale_formateur, name='page_principale_formateur'),
    path('circuit_du_gazoil_formateur/',views.circuit_du_gazoil_formateur, name='circuit_du_gazoil_formateur'),
    path('circuit_eau_de_mer_formateur/',views.circuit_eau_de_mer_formateur, name='circuit_eau_de_mer_formateur'),
    path('palliers_et_cylinders_formateur/',views.palliers_et_cylinders_formateur, name='palliers_et_cylinders_formateur'),
    path('temperature_des_palliers_formateur/',views.temperature_des_palliers_formateur, name='temperature_des_palliers_formateur'),
    path('temperature_d_echapement_des_cylindres_formateur/',views.temperature_d_echapement_des_cylindres_formateur, name='temperature_d_echapement_des_cylindres_formateur'),
    path('tableau_des_variable_formateur/',views.tableau_des_variable_formateur, name='tableau_des_variable_formateur'),
     
    # **************** Fouter **************

    path('fouter/',views.fouter, name='fouter'),


    # **************** connexion *************

    path('',views.connexion, name='connexion'),


    # ***************************************
    path('back/',views.back, name='back'),
    path('forward/',views.forward, name='forward'),
   
]
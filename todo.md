#css et design

-ajouter plus de css (backgroud-color,la font et la taille des éléments )
-s'il y avait un design système entreprise, on pourra faire plus de truc sympa
-ajouter une pipe number plus costumée
-ajouter une directive pour gérer l'affichage des currency ( utiliser des symboles au lieu des lettres dans le tableau)

##Implémentation de solution et performances

-Actuellement on utlise les deux modules reactiveForms et NgModel pour le binding des données, il vaut mieux utiliser soit l'un soir l'autre seulement
-Créer un formGroup qui regroupe l'ensemble des Control au lieu de créer plusieurs variables FormControl
-pour la boucle continue, j'ai utilisé interval de rxjs, mais on pourra utiliser la méthode native de typeScript setInterval() 
  il ne faut juste  pas oublier d'arrêter la boucle dans le ngOndestroy en utilisant clearInterval().
-centraliser les constantes, créer un fichier pour les méthodes utilitaires
-factoriser le code pour utiliser des object (Amount:{value,currency}) au lieu des variables (number,string) 
-ajouter un min value pour les inputs pour ne pas saisir des valeurs négatives


##configuration du projet

-mettre en place des tests unitaires
-configuration de linting ajout de prettier


des TODO ajoutés dans le code directement.




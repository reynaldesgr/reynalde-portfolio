<script setup>

// Primevue
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { Carousel } from 'primevue';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';

// Vue
import { computed, ref } from 'vue';

// VeeValidate
import { ErrorMessage, Field, useForm } from 'vee-validate';
import * as yup from 'yup';

// EmailJS
import emailjs from '@emailjs/browser';



const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';


// Variables
const certifications = ref([
  { 
    issuer: 'Coursera (2022)', 
    image: '/logos/coursera.png',
    name: 'POO & Développement JAVA'
  },
  { 
    issuer: 'Google (2022)', 
    image: '/logos/google.png',
    name: 'Administration Système IT'
  },
  { 
    issuer: 'Codio (2022)', 
    image: '/logos/codio.png',
    name: 'Unix System Basics'
  },
  { 
    issuer: 'Coursera (2023)', 
    image: '/logos/coursera.png',
    name: 'UX/UI: Mobile App Project'
  }
]);

const competences = ref([
  { cat: 'Frameworks', items: ['ASP.NET Core (C#)', 'Entity Framework Core (C#)', 'Hibernate (Java)', 'Springboot (Java)']},
  { cat: 'Langages', items: ['BASH/UNIX', 'C', 'C# / .NET', 'C++', 'Java', 'SQL (Oracle)'] },
  { cat: 'Environnement de développement', items:  ['Cursor', 'Intellij Idea (Jetbrains)', 'Rider (Jetbrains)', 'Visual Studio Code']},
  { cat: 'Outils de développement', items: ['Azure Devops', 'Git / Github'] },
  { cat: 'Outils de monitoring', items: ['ElasticSearch', 'Kibana']}
]);


const parcours = ref([
  { 
    degree: 'F2 : Génie Logiciel & Systèmes Informatiques', 
    details: 'Apprentissage des fondamentaux de l\'ingénierie logicielle : algorithmique avancée, structures de données, et programmation système. Formation incluant la conception de systèmes numériques, la cybersécurité, et la gestion de bases de données relationnelles.',
    image: '/logos/isima.png',
    place: 'ISIMA — Clermont-Ferrand, France', 
    year: '2023 — 2025'
  },
  { 
    degree: 'Summer School - Ostbayerische Technische Hochschule', 
    details: 'Réalisation d\'un échange étudiant international focalisé sur l\'optimisation linéaire et non linéaire. Application pratique des techniques de modélisation et de résolution de problèmes complexes via le langage Python.',
    image: '/logos/oth.png',
    place: 'OTH — Ratisbonne, Allemagne', 
    year: '2023'
  },
  { 
    degree: 'CUPGE (Classe Préparatoire Intégrée) - Prep\'ISIMA', 
    details: 'Parcours intensif réalisé en double cursus avec une Licence Informatique. Acquisition de compétences variées : mathématiques pour l\'ingénieur, imagerie numérique (traitement d\'images), développement mobile (Android Studio), ainsi qu\'une initiation à la réalité virtuelle sous Processing.',
    image: 'https://placehold.co/10x10/3b82f6/white?text=Prep\'ISIMA',
    place: 'ISIMA — Clermont-Ferrand, France', 
    year: '2020 — 2022'
  }
]);

const profil = {
  contact: {
    email: "reynalde.sgr@outlook.fr",
    linkedin: "https://www.linkedin.com/in/reynalde-segerie-20bb25251"
  },
  ecole: "ISIMA - Institut Supérieur d'Informatique, de Modélisation et de leurs Applications",
  nom: "Reynalde Segerie",
  titre: "Ingénieure informatique en Génie Logiciel & Système d'informations"
};

const projets = ref([
  { 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/CERN_logo_badge.svg/langfr-250px-CERN_logo_badge.svg.png',
    desc: 'Pilotage technique de la transition vers le Beam Interlocks System v2 (BISv2). Conception et implémentation d\'un modèle de référence robuste pour la gestion des permis faisceaux via une architecture Java/Spring Boot.',
    link: 'https://indico.cern.ch/event/1432373/contributions/6026291/attachments/2890411/5066432/MPE-CB%20Section%20Meeting-SEGERIE-Reynalde.pdf',
    tags: ['Agile', 'Angular', 'Gradle', 'Java', 'Spring Boot'],
    title: 'Modernisation du modèle de référence du BIS & de son interface graphique', 
    type: 'pro'
  },
  {
    companyLogo: 'https://placehold.co/100x100/3b82f6/white?text=Skori',
    desc: 'Développement de fonctionnalités sur une architecture distribuée basée sur les microservices sous .NET. Implémentation de patterns Event-Driven via RabbitMQ et monitoring centralisé avec la stack ELK.', 
    tags: ['Azure DevOps', 'C#/.NET', 'Kibana/ElasticSearch', 'RabbitMQ'],
    title: 'Développement fullstack & modernisation d\'architecture en microservices', 
    type: 'pro'
  },
  { 
    companyLogo: 'https://i.postimg.cc/ydKk5q3G/stepcoins-logo.png',
    desc: 'Application développé dans le cadre d\'un hackathon à ISIMA sur le thème du développement durable.', 
    link: 'https://github.com/reynaldesgr/StepCoins/tree/master',
    tags: ['Angular 16', 'Ethers.js', 'TypeScript'],
    title: 'Stepcoins (application décentralisée Web3)',
    type: 'acad'
  },
  { 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Processing_3_logo.png',
    desc: 'Développement d\'une application de vision par ordinateur traitant les flux de données spatiales d\'une Xbox Kinect (nuages de points en temps réel).', 
    images: ['https://perso.isima.fr/~resegerie/project-2.gif'],
    tags: ['Java', 'Kinect SDK', 'Processing'],
    title: 'Mapping de Profondeur 3D (Xbox Kinect)', 
    type: 'acad'
  },
  { 
    desc: 'Ingénierie d\'une plateforme web complète utilisant le framework Spark Java. Architecture MVC et moteur de recherche dynamique.', 
    tags: ['Java', 'Maven', 'Spark Framework', 'SQL'],
    title: 'Site web  d\'agence de voyage', 
    type: 'acad'
  },
  { 
    desc: 'Développement bas niveau d\'un moteur de jeu avec gestion rigoureuse de la mémoire vive et rendu graphique via la bibliothèque SDL.', 
    tags: ['C', 'SDL 2.0'],
    title: 'Moteur de Jeu de logique (2048) en C', 
    type: 'acad'
  },
  { 
    desc: 'Conception d\'un clone du jeu d\'arcade avec détection de collisions circulaires et gestion de vecteurs mathématiques en Python.', 
    tags: ['Programmation orientée objet', 'Pygame', 'Python'],
    title: 'Développement du jeu "Pizzle Bobble"', 
    type: 'acad'
  }
]);

const academicsProjects = computed(() => projets.value.filter(p => p.type === 'acad'));
const professionalsProjects = computed(() => projets.value.filter(p => p.type === 'pro'));

const skills = ref([
  {
    category: 'Langages',
    items: [
      { level: 80, name: 'C#/.NET' },
      { level: 75, name: 'C' },
      { level: 75, name: 'Java' },
      { level: 75, name: 'SQL/Oracle' },
      { level: 70, name: 'C++' },
      { level: 40, name: 'BASH/UNIX' }
    ]
  },
  {
    category: 'Frameworks',
    items: [
      { level: 80, name: 'ASP.NET Core' },
      { level: 80, name: 'EF Core' },
      { level: 75, name: 'Springboot (Java)' },
      { level: 75, name: 'Hibernate (Java)' }
    ]
  },
  { 
    category: 'Environnement de développement',
    items: [
      { level: 90, name: 'Intellij Idea' },
      { level: 90, name: 'Rider' },
      { level: 60, name: 'Visual Studio Code' },
      { level: 50, name: 'Cursor' }
    ]
  },
  {
    category: 'Outils de développement',
    items: [
      { level: 95, name: 'Git / Github' },
      { level: 30, name: 'Azure Devops' }
    ]
  },
  { 
    category: 'Outils de monitoring',
    items: [
      { level: 70, name: 'ElasticSearch' },
      { level: 50, name: 'Kibana' }
    ]
  }
]);


// Form validation
const validationSchema = yup.object({
  company: yup.string(),
  email: yup
    .string()
    .required('L\'email est requis.')
    .email('Format d\'email invalide (ex: votre@email.com).'),
  message: yup
    .string()
    .required('Le message est requis.')
    .max(500, 'Le message ne doit pas dépasser 500 caractères.'),
  name: yup.string(),
  phone: yup
    .string()
    .test('phone-format', 'Format de téléphone invalide (ex: 06 12 34 56 78).', (value) => {
      if (!value || value.trim() === '') return true;
      const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
      const cleanedPhone = value.trim().replace(/[\s.-]/g, '');
      return phoneRegex.test(cleanedPhone);
    })
});

const { handleSubmit, values, resetForm } = useForm({
  validationSchema,
  initialValues: {
    company: '',
    email: '',
    message: '',
    name: '',
    phone: ''
  }
});

const submitError = ref(null);
const submitLoading = ref(false);
const submitted = ref(false);

const submitForm = handleSubmit(async (formValues) => {
  submitError.value = null;
  
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    submitError.value = 'Configuration EmailJS manquante.';
    return;
  }
  submitLoading.value = true;
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    const params = {
      from_company: formValues.company || '',
      from_email: formValues.email.trim(),
      from_name: formValues.name || '',
      from_phone: formValues.phone ? formValues.phone.trim() : '',
      message: formValues.message.trim(),
    };
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    submitted.value = true;
    resetForm();
  } catch (err) {
    submitError.value = "L'envoi a échoué. Réessayez ou contactez-moi par email.";
    console.error('EmailJS error:', err);
  } finally {
    submitLoading.value = false;
  }
});

</script>

<template>
  <div class="portfolio-page">
    <div class="portfolio-container">

      <section class="section section-hero">
        <div class="section-card hero-card">
          <div class="section-inner">
            <Avatar image="/img/reynalde-cv.jpg" shape="circle" class="hero-avatar" />
            <div class="hero-content">
              <h1 class="hero-title">{{ profil.nom.toUpperCase() }}</h1>
              <h2 class="hero-subtitle">{{ profil.titre }}</h2>
              <div class="hero-actions">
                <Button label="LinkedIn" icon="pi pi-linkedin" severity="secondary" rounded as="a" :href="profil.contact.linkedin" target="_blank" />
                <Button label="Me contacter" icon="pi pi-envelope" rounded as="a" href="#contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-profil">
        <div class="section-header">
          <span class="section-num">00</span>
          <h2 class="section-title">Mon profil</h2>
        </div>
        <div class="section-card profil-card">
          
          <div class="profil-subsection">
            <h3 class="profil-subtitle">Parcours</h3>
            <p class="profil-text">
              Bienvenue sur mon portfolio ! Je suis <strong class="text-primary">Reynalde Segerie</strong>, diplômée de l'<strong class="text-primary">ISIMA</strong> (Institut Supérieur d'Informatique, de Modélisation et de leurs Applications) en septembre 2025, après cinq années de spécialisation en développement logiciel.
            </p>
            <p class="profil-text">
              Je recherche désormais une entreprise où mettre en pratique mes compétences tout en apportant mon expertise, ma bienveillance et mon envie d'apprendre.
            </p>
          </div>

          <div class="profil-subsection">
            <h3 class="profil-subtitle">Domaine d'activité</h3>
            <p class="profil-text">
              Mon domaine de prédilection est le <strong class="text-primary">développement web</strong>. J'ai consolidé cette expertise lors de mon stage au <strong class="text-primary">CERN</strong> (Conseil Européen pour la Recherche Nucléaire), puis tout au long de mon alternance et de mon CDI chez <strong class="text-primary">Skori</strong>, une startup à Cournon-d'Auvergne. Depuis près d'un an et demi, j'exerce en tant que développeuse <strong class="text-primary">fullstack</strong>, avec une affinité pour le backend.
            </p>
            <p class="profil-text">
              J'ai également acquis une compétence significative en <strong class="text-primary">modélisation des systèmes d'information</strong> — conception de schémas de données, modélisation UML, architecture applicative — grâce à ma formation.
            </p>
            <p class="profil-text">
              Issue d'une formation en génie logiciel (<a href="https://www.isima.fr/2025/05/28/le-programme-f2/" target="_blank" rel="noopener" class="profil-link">plaquette F2 ISIMA</a>), je suis engagée et prête à m'investir dans des missions orientées notamment vers :
            </p>
            <ul class="profil-list">
              <li><strong class="text-primary">Data & Analytics</strong> — business intelligence (BI), traitement de volumes de données — <em> Analyste données</em></li>
              <li><strong class="text-primary">Automatisation & DevOps</strong> — scripts, orchestration de workflows, CI/CD — <em>DevOps </em></li>
              <li><strong class="text-primary">Qualité logicielle</strong> — tests unitaires, tests d'intégration, qualification — <em>Ingénieur QA, Test engineer</em></li>
            </ul>
          </div>

          <div class="profil-subsection">
            <h3 class="profil-subtitle">Recherche actuelle</h3>
            <p class="profil-text">
              Je suis d'abord et avant tout <strong class="text-primary">développeuse fullstack</strong>, avec une spécialisation backend. À l'heure actuelle, je souhaite m'orienter vers les domaines cités ci-dessus — data, automatisation, qualité logicielle — tout en continuant à valoriser mon expertise web. Vous souhaitez mettre à profit mes compétences ? N'hésitez pas à <a href="#contact" class="profil-link">me contacter</a>.
            </p>
          </div>

        </div>
      </section>

      <div class="content-grid">
      <section class="section section-main">
        <div class="section-header">
        <span class="section-num">01</span>
        <h2 class="section-title">Expériences professionnelles</h2>
      </div>
      <div class="section-card mb-6">
        <div class="grid projets-grid">
          <div v-for="p in professionalsProjects" :key="p.title" class="col-12 md:col-6">
            <Card class="projet-card h-full">
              <template #title>
                <div class="flex justify-content-between align-items-start gap-3">
                  <span class="text-white text-lg font-bold">{{ p.title }}</span>
                  <img v-if="p.companyLogo" :src="p.companyLogo" class="w-3rem h-3rem bg-white p-1 border-round shadow-2 object-contain" />
                </div>
                <Button 
                  v-if="p.link" 
                  icon="pi pi-external-link" 
                  label="Voir" 
                  class="p-button-sm p-button-text p-button-rounded p-0 px-2" 
                  as="a" 
                  :href="p.link" 
                  target="_blank" 
                />
              </template>
              <template #content>
                <p class="text-slate-400 text-sm mb-4 line-height-3 text-justify">{{ p.desc }}</p>
                <div class="flex flex-wrap gap-1 mb-4">
                  <Tag v-for="t in p.tags" :key="t" :value="t" severity="info" variant="outline" class="text-xs" />
                </div>
                <div v-if="p.images && p.images.length" class="flex gap-2 pt-3 border-top-1 border-slate-800">
                  <img v-for="img in p.images" :key="img" :src="img" class="w-4rem h-3rem border-round cursor-pointer hover:opacity-70 transition-all shadow-1" style="object-fit: cover;"/>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>

      <div class="section-header mt-5">
        <span class="section-num">02</span>
        <h2 class="section-title">Projets académiques</h2>
      </div>
      <div class="section-card mb-6">
        <div class="grid projets-grid">
          <div v-for="p in academicsProjects" :key="p.title" class="col-12 md:col-6 lg:col-6">
            <Card class="projet-card h-full surface-card">
              <template #title>
                <div class="flex justify-content-between align-items-start gap-3">
                  <span class="text-white text-lg font-bold">{{ p.title }}</span>
                  <img v-if="p.companyLogo" :src="p.companyLogo" class="w-3rem h-3rem bg-white p-1 border-round shadow-2 object-contain" />
                </div> 
                <Button 
                  v-if="p.link" 
                  icon="pi pi-external-link" 
                  label="Voir" 
                  class="p-button-sm p-button-text p-button-rounded p-0 px-2" 
                  as="a" 
                  :href="p.link" 
                  target="_blank" 
                />
              </template>
              <template #content>
                <p class="text-slate-500 text-xs mb-3">{{ p.desc }}</p>
                <div class="flex flex-wrap gap-1">
                  <Tag v-for="t in p.tags" :key="t" :value="t" severity="secondary" variant="outline" class="text-xs opacity-80" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>

        <div class="section-header mt-8">
        <span class="section-num">02</span>
        <h2 class="section-title">Formation</h2>
        </div>
        <div class="section-card">
          <Timeline :value="parcours" class="formation-timeline">
            <template #marker="slotProps">
              <span class="flex align-items-center justify-content-center border-circle bg-primary shadow-2" style="width: 1rem; height: 1rem">
              </span>
            </template>
            
            <template #content="slotProps">
              <div class="formation-item pb-5">
                <h3 class="text-white m-0 text-xl font-bold formation-degree-title">
                  <img v-if="slotProps.item.image" :src="slotProps.item.image" :alt="slotProps.item.degree" class="formation-degree-image" />
                  {{ slotProps.item.degree }}
                </h3>
                <div class="text-primary font-bold my-2">
                  <i class="pi pi-map-marker mr-1 text-xs"></i> {{ slotProps.item.place }} 
                  <span class="mx-2 text-slate-600">|</span> 
                  <i class="pi pi-calendar mr-1 text-xs"></i> {{ slotProps.item.year }}
                </div>
                <p class="text-slate-400 text-sm line-height-3 m-0 mt-2 text-justify">
                  {{ slotProps.item.details }}
                </p>
              </div>
            </template>
          </Timeline>
        </div>
        
      </section>

      <aside class="sidebar-wrapper">

      <section class="section section-sidebar">
        <div class="section-header">
          <span class="section-num">—</span>
          <h2 class="section-title">Compétences clés</h2>
        </div>
        <div class="section-card">
          <div v-for="skill in competences" :key="skill.cat" class="skill-group">
            <span class="skill-category">{{ skill.cat }}</span>
            <div class="flex flex-wrap gap-2">
              <Tag v-for="item in skill.items" :key="item" :value="item" class="skill-tag" />
            </div>
          </div>
        </div>

        <div class="section-header mt-6"></div>

        <div class="section-card p-0 overflow-hidden"> 
          <Carousel 
            :value="skills" 
            :numVisible="1" 
            :numScroll="1" 
            :circular="true" 
            :autoplayInterval="4000" 
            :showIndicators="true"
            :showNavigators="false"
            class="custom-skill-carousel"
          >
            <template #item="slotProps">
              <div class="p-4">
                <h4 class="text-primary mb-4 text-center font-bold uppercase tracking-wider text-sm">
                  {{ slotProps.data.category }}
                </h4>
                
                <div v-for="skill in slotProps.data.items" :key="skill.name" class="mb-4">
                  <div class="flex justify-content-between mb-2">
                    <span class="text-slate-200 text-sm font-medium">{{ skill.name }}</span>
                    <span class="text-primary text-xs font-bold">{{ skill.level }}%</span>
                  </div>
                  <ProgressBar :value="skill.level" :showValue="false" style="height: 6px"></ProgressBar>
                </div>
              </div>
            </template>
          </Carousel>
        </div>

        <div class="section-header mt-6">
          <span class="section-num">—</span>
          <h2 class="section-title">Certifications</h2>
        </div>
        <div class="section-card">
          <div v-for="cert in certifications" :key="cert.name" class="cert-item flex items-center gap-3 mb-4">
            <img :src="cert.image" :alt="cert.name" class="w-2rem h-2rem bg-white p-1 border-round shadow-2 object-contain" />
            <div>
              <div class="text-sm font-bold text-white">{{ cert.name }}</div>
              <small class="text-slate-500">{{ cert.issuer }}</small>
            </div>
          </div>
        </div>
                
      </section>
      </aside>
      </div>
      

      <section id="contact" class="section section-contact">
        <div class="section-header">
          <span class="section-num">03</span>
          <h2 class="section-title">Contact & Opportunités</h2>
        </div>
        <Card class="section-card contact-card" :pt="{ content: { class: 'p-fluid' } }">
          <template #content>
            <div v-if="!submitted" class="grid contact-form-grid">
              <div class="col-12 md:col-6 field mb-3">
                <label for="name" class="text-slate-400 block mb-2 font-bold">Nom</label>
                <Field name="name" v-slot="{ field }">
                  <InputText 
                    id="name" 
                    v-bind="field" 
                    placeholder="Ex: Jean Dupont" 
                    class="w-full bg-slate-950 border-slate-800" 
                  />
                </Field>
              </div>
              <div class="col-12 md:col-6 field mb-3">
                <label for="email" class="text-slate-400 block mb-2 font-bold">Email <span class="text-red-500">*</span></label>
                <Field name="email" v-slot="{ field, meta }">
                  <InputText 
                    id="email" 
                    v-bind="field" 
                    type="email" 
                    placeholder="votre@email.com" 
                    :class="['w-full bg-slate-950 border-slate-800', meta.touched && !meta.valid ? 'border-red-500' : '']"
                  />
                </Field>
                <ErrorMessage name="email" class="text-red-500 block mt-1" />
              </div>
              <div class="col-12 md:col-6 field mb-3">
                <label for="phone" class="text-slate-400 block mb-2 font-bold">Téléphone</label>
                <Field name="phone" v-slot="{ field, meta }">
                  <InputText 
                    id="phone" 
                    v-bind="field" 
                    placeholder="Ex: 06 12 34 56 78" 
                    :class="['w-full bg-slate-950 border-slate-800', meta.touched && !meta.valid ? 'border-red-500' : '']"
                  />
                </Field>
                <ErrorMessage name="phone" class="text-red-500 block mt-1" />
              </div>
              <div class="col-12 md:col-6 field mb-3">
                <label for="company" class="text-slate-400 block mb-2 font-bold">Entreprise</label>
                <Field name="company" v-slot="{ field }">
                  <InputText 
                    id="company" 
                    v-bind="field" 
                    placeholder="Nom de l'entreprise" 
                    class="w-full bg-slate-950 border-slate-800" 
                  />
                </Field>
              </div>
              <div class="col-12 field">
                <label for="message" class="text-slate-400 block mb-2 font-bold">Message <span class="text-red-500">*</span></label>
                <Field name="message" v-slot="{ field, meta }">
                  <Textarea 
                    id="message" 
                    v-bind="field" 
                    rows="5" 
                    placeholder="Décrivez votre offre, demande, mission(s)..." 
                    :class="['w-full bg-slate-950 border-slate-800 p-3', meta.touched && !meta.valid ? 'border-red-500' : '']"
                    style="resize: vertical; min-height: 140px;" 
                  />
                </Field>
                <div class="flex justify-content-between align-items-center mt-1">
                  <ErrorMessage name="message" class="text-red-500" />
                  <small :class="values.message && values.message.length > 500 ? 'text-red-500' : 'text-slate-500'">
                    {{ values.message ? values.message.length : 0 }} / 500
                  </small>
                </div>
              </div>
              <div class="col-12">
                <Message v-if="submitError" severity="error" icon="pi pi-times" class="mb-3">{{ submitError }}</Message>
                <Button
                  label="Envoyer"
                  icon="pi pi-send"
                  @click="submitForm"
                  :loading="submitLoading"
                  :disabled="submitLoading"
                  class="p-button-lg shadow-4"
                />
              </div>
            </div>
            <Message v-else severity="success" icon="pi pi-check" class="mt-4">
              Merci {{ values.name || 'votre message' }} ! Votre message a bien été envoyé.
            </Message>
          </template>
        </Card>

        <div class="section-card offres-card mt-6">
          <h3 class="offres-title mg">Offres recherchées</h3>
          <p class="offres-intro">Vous avez une opportunité correspondant à ces critères ? N'hésitez pas à me contacter.</p>
          <div class="square-container">
          <div class="offres-grid">
            <div class="offre-item" style="--i:0">
              <span class="offre-icon-wrap"><i class="pi pi-code offre-icon"></i></span>
              <span class="offre-label">Domaine d'activité</span>
              <span class="offre-value">Dev. web (fullstack) junior, tests & automatisation, traitement & analyse de données</span>
            </div>
            <div class="offre-item" style="--i:1">
              <span class="offre-icon-wrap"><i class="pi pi-briefcase offre-icon"></i></span>
              <span class="offre-label">Contrat</span>
              <span class="offre-value">CDI ou CDD</span>
            </div>
            <div class="offre-item" style="--i:2">
              <span class="offre-icon-wrap"><i class="pi pi-euro offre-icon"></i></span>
              <span class="offre-label">Rémunération</span>
              <span class="offre-value">35–39 k€</span>
            </div>
            <div class="offre-item" style="--i:3">
              <span class="offre-icon-wrap"><i class="pi pi-id-card offre-icon"></i></span>
              <span class="offre-label">Statut</span>
              <span class="offre-value">Cadre</span>
            </div>
            <div class="offre-item" style="--i:4">
              <span class="offre-icon-wrap"><i class="pi pi-building offre-icon"></i></span>
              <span class="offre-label">Entreprise</span>
              <span class="offre-value">Toute structure (startup, PME, grand groupe)</span>
            </div>
            <div class="offre-item" style="--i:5">
              <span class="offre-icon-wrap"><i class="pi pi-map-marker offre-icon"></i></span>
              <span class="offre-label">Localisation</span>
              <span class="offre-value">Clermont-Ferrand (63)</span>
            </div>
            <div class="offre-item">
              <span class="offre-icon-wrap" style="--i:6"><i class="pi pi-check-circle offre-icon"></i></span>
              <span class="offre-label">Full Remote</span>
              <span class="offre-value">Possibilité de full remote</span>
            </div>
          </div>
        </div>
        </div>
      </section>


      <footer class="py-6 border-top-1 border-slate-900 text-center text-slate-600 text-sm">
        <p>REYNALDE SEGERIE • 2026</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');

.portfolio-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #020617 50%, #0a0f1a 100%);
  color: #e2e8f0;
  padding: 2rem 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section commune */
.section {
  margin-bottom: 3rem;
}


.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.section-num {
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
  opacity: 0.9;
  letter-spacing: 0.1em;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #3b82f6;
  margin: 0;
}

.section-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
}

.section-hero {
  padding: 2rem 0 3rem 0;
}

.hero-card {
  padding: 2.5rem !important;
  border: 1px solid rgba(51, 65, 85, 0.6);
}

.section-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

@media (min-width: 768px) {
  .section-inner {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 4rem;
  }
}

.hero-avatar {
  border: 3px solid #3b82f6 !important;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.2) !important;
  width: 140px !important;
  height: 140px !important;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin: 0;
}

.hero-subtitle {
  font-size: 1.125rem;
  font-weight: 300;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 0.5rem;
}

@media (min-width: 768px) {
  .hero-actions {
    justify-content: flex-start;
  }
}

.section-profil {
  margin-top: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

.section-profil .section-header {
  margin-bottom: 1.5rem;
}

.profil-card {
  line-height: 1.8;
  padding: 2rem 2rem !important;
}

.profil-subsection {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.4);
}

.profil-subsection:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.profil-subtitle {
  font-size: 0.9rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 1rem 0;
}

.profil-text {
  color: #dae1ea;
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
}

.profil-text:last-child {
  margin-bottom: 0;
}

.profil-subsection .profil-text:last-child {
  margin-bottom: 0;
}

.profil-link {
  color: #3b82f6;
  text-decoration: none;
}

.profil-link:hover {
  text-decoration: underline;
}

.profil-list {
  margin: 0.75rem 0 0 1.25rem;
  padding: 0;
  color: #dce3ee;
  font-size: 1rem;
  line-height: 1.9;
}

.profil-list li {
  margin-bottom: 0.5rem;
}

.profil-list li:last-child {
  margin-bottom: 0;
}

.profil-list em {
  color: #dee6f2;
  font-size: 0.9rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 360px;
  }
}

.projets-grid {
  margin: -0.5rem !important;
}

.projets-grid .col-12 {
  padding: 0.5rem !important;
}

.projet-card {
  height: 100% !important;
  background: rgba(15, 23, 42, 0.9) !important;
  border: 1px solid rgba(51, 65, 85, 0.6) !important;
  border-radius: 12px !important;
  transition: border-color 0.3s, box-shadow 0.3s !important;
}

.projet-card:hover {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.15) !important;
}

.formation-timeline {
  margin-top: 1rem !important;
}

.formation-item {
  margin-bottom: 1.5rem;
}

.formation-item:last-child {
  margin-bottom: 0;
}

.formation-degree-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.formation-degree-image {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
}

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-group {
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(51, 65, 85, 0.4);
}

.skill-group:last-child {
  margin-bottom: 0;
}

.skill-category {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  color: #f6f8fa;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.skill-tag {
  background: rgba(51, 65, 85, 0.8) !important;
  color: #cbd5e1 !important;
  border: none !important;
}

.cert-item {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
  border-left: 3px solid #3b82f6;
}

.cert-item:last-child {
  margin-bottom: 0;
}


.section-contact {
  padding-top: 1rem;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
}

.contact-card {
  margin-top: 1rem !important;
}

:root {
  --total-items: 7;
  --radius: 250px
}

.square-container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.offres-card {
  padding: 2rem !important;
}

.offres-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 0.5rem 0;
}

.offres-intro {
  color: #f8fbff;
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
}

.offres-grid {
  display: grid;
  grid-template-columns: repeat(2, 1rem); 
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 1rem;
  justify-content: center;
}

.offre-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(51, 65, 85, 0.4);
}

.offre-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.offre-icon {
  font-size: 0.75rem;
  color: #3b82f6;
}

.offre-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.offre-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e2e8f0;
}

footer {
  padding: 2rem 0;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}

footer p {
  margin: 0;
}
</style>

<style>
:root { --p-primary-color: #3b82f6; font-family: 'Plus Jakarta Sans', sans-serif; }
body { margin: 0; background-color: #020617; scroll-behavior: smooth; }
.p-card .p-card-content { padding: 1rem 1.25rem; }
.p-timeline-event-opposite { display: none !important; }
.p-timeline-event-content { padding-left: 1.5rem !important; }
.p-inputtext:focus, .p-textarea:focus { border-color: var(--p-primary-color) !important; }
</style>
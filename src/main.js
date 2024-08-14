import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const mutations = [];
window.mutations = mutations;
const spells = [];
window.spells = spells;
const sources = [];
window.sources = sources;
const armor = [];
window.armor = armor;
const weapons = [];
window.weapons = weapons;
const mutationSnapshot = await getDocs(collection(db, "mutations"));
mutationSnapshot.forEach((doc) => {
    mutations.push(doc.data());
});
const spellSnapshot = await getDocs(collection(db, "Spell deliveries"));
spellSnapshot.forEach((doc) => {
    spells.push(doc.data());
})
const sourceSnapshot = await getDocs(collection(db, "Spell sources"));
sourceSnapshot.forEach((doc) => {
    sources.push(doc.data());
})
const gearSnapshot = await getDocs(collection(db, 'equipment'));
gearSnapshot.forEach((doc) => {
    if (doc.data().category === 'Armor') {
        armor.push(doc.data());
    } else {
        weapons.push(doc.data());
    }
})

function populateMutationList(list, origin) {
    const container = document.getElementById('mutations');
    container.innerHTML = '';
    for (const entry of list) {
        if (entry.origin === origin) {
            createMutationCard(entry.name, entry.description, entry.slot);
        }
    }
    container.scrollIntoView(true);
}
window.populateMutationList = populateMutationList;

function populateSpellList(list) {
    const container = document.getElementById('spells');
    container.innerHTML = '';
    for (const entry of list) {
        createSpellCard(entry.name, entry.description, entry.augment, entry.action);
    }
    container.scrollIntoView(true);
}
window.populateSpellList = populateSpellList;

function populateSourceList(list) {
    const container = document.getElementById('spells');
    container.innerHTML = '';
    for (const entry of list) {
        createSourceCard(entry.name, entry.description, entry.special, entry.deliveries);
    }
    container.scrollIntoView(true);
}
window.populateSourceList = populateSourceList;

function populateGearTable(list, category) {
    const container = document.getElementById('gear-table');
    container.innerHTML = '';
    const gearTable = document.createElement('table');
    gearTable.classList.add('table', 'table-dark', 'w-50', 'mx-auto', 'my-5')
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const header1 = document.createElement('th');
    const header2 = document.createElement('th');
    const header3 = document.createElement('th');
    tableHeader.append(header1, header2, header3);
    gearTable.append(tableHeader, tableBody);
    container.append(gearTable);
    if (category === 'Armor') {
        header1.innerHTML = 'Name';
        header2.innerHTML = 'Armor type';
        header3.innerHTML = 'Armor value';
    } else {
        header1.innerHTML = 'Name';
        header2.innerHTML = 'Weapon type';
        header3.innerHTML = 'Damage value';
    }
    for (const entry of list) {
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const typeCell = document.createElement('td');
        const valueCell = document.createElement('td');
        nameCell.innerHTML = entry.name;
        typeCell.innerHTML = entry.type;
        valueCell.innerHTML = entry.value;
        newRow.append(nameCell, typeCell, valueCell);
        tableBody.append(newRow);
    }
}
window.populateGearTable = populateGearTable;

function createMutationCard(name, description, slot) {
    
    const card = document.createElement("div");
    const cardName = document.createElement("h2");
    cardName.innerHTML = name;
    cardName.classList.add('test', 'card-title');
    card.append(cardName);
    card.append(document.createElement('br'));
    const cardDescription = document.createElement("p");
    cardDescription.innerHTML = description;
    card.append(cardDescription);
    card.append(document.createElement('br'));
    const cardSlot = document.createElement("p");
    const cardSlotCategory = document.createElement('span');
    cardSlotCategory.classList.add('fw-bold');
    cardSlotCategory.innerHTML = 'Mutation slot: ';
    cardSlot.append(cardSlotCategory);
    cardSlot.append(slot);
    card.append(cardSlot);
    card.append(document.createElement('br'));
    card.classList.add('card', 'bg-dark', 'my-3', 'p-3', 'text-start');
    const container = document.getElementById('mutations');
    container.append(card);
}

function createSpellCard(name, description, augment, action) {
    const container = document.getElementById('spells');
    const card = document.createElement("div");
    card.classList.add('card');
    const cardName = document.createElement("h2");
    cardName.innerHTML = name;
    cardName.classList.add('test', 'card-title');
    card.append(cardName);
    card.append(document.createElement('br'));
    const cardAction = document.createElement('p');
    const cardActionHeader = document.createElement('span');
    cardActionHeader.innerHTML = 'Action: ';
    cardAction.append(cardActionHeader, action);
    const cardDescription = document.createElement('p');
    cardDescription.innerHTML = description;
    card.append(cardDescription);
    card.append(document.createElement('br'));
    const cardAugment = document.createElement('p');
    const cardAugmentHeader = document.createElement('span');
    cardAugmentHeader.classList.add('fw-bold');
    cardAugmentHeader.innerHTML = 'Augment: ';
    cardAugment.append(cardAugmentHeader, augment);
    card.append(cardAugment);
    card.append(document.createElement('br'));
    card.classList.add('card', 'bg-dark', 'my-3');
    container.append(card);
}

function createSourceCard(name, description, special, deliveries) {
    console.log(deliveries);
    const container = document.getElementById('spells');
    const card = document.createElement("div");
    card.classList.add('card');
    const cardName = document.createElement("h2");
    cardName.innerHTML = name;
    cardName.classList.add('test', 'card-title');
    card.append(cardName);
    const cardDescription = document.createElement('p');
    cardDescription.innerHTML = description;
    card.append(cardDescription);
    card.append(document.createElement('br'));
    const cardSpecial = document.createElement('p');
    cardSpecial.innerHTML = special;
    card.append(cardSpecial);
    card.append(document.createElement('br'));
    const deliveriesHeader = document.createElement('p');
    deliveriesHeader.classList.add('fw-bold', 'fs-4');
    deliveriesHeader.innerHTML = 'Available deliveries';
    card.append(deliveriesHeader);
    const cardDeliveries = document.createElement('ul');
    cardDeliveries.classList.add('list-group', 'list-group-flush', 'list-group-horizontal-md', 'justify-content-center', 'mb-3');
    for (const delivery of deliveries) {
        const entry = document.createElement('li');
        entry.innerHTML = delivery;
        entry.classList.add('list-group-item', 'bg-dark', 'text-light');
        cardDeliveries.append(entry);
    }
    card.append(cardDeliveries);
    card.append(document.createElement('br'));
    card.classList.add('card', 'bg-dark', 'my-3');
    container.append(card);
}
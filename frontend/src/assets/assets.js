import salema_logo from './salema-logo.jpg'
import stripe_logo from './stripe-logo.png'
import panic_button from './panic-button.jpg'
import piece_set from './8-piece.png'
import alarm from './alarm.png'
import beesafe_keychain from './beesafe-keychain.png'
import black_set from './black-piece.jpg'
import cat_keychain from './cat-keychain.png'
import dog_keychain from './dog-keychain.jpg'
import dragon_keychain from './dragon-keychain.png'
import knuckle_spike from './knuckle-spike.png'
import pink_set from './pink-piece.jpg'
import whistle_keychain from './whistle-keychain.png'


export const assets = {
    stripe_logo,
    salema_logo,
    panic_button
}

export const product = [
   {
    _id: "1",
    name: "Cat shaped keychain",
    description: "This 3D-printed cat-shaped keychain doubles as a discreet and effective self-defense knuckle duster. Designed with two finger holes for a secure grip and sharp ear-like tips forstriking, it provides added protection in emergency situations while blending in as a stylish accessory.",
    price:"30",
    image:[cat_keychain],
    category: "Self-Defence",
    date:"1716634345448",
    bestseller: true
   },
   {
    _id: "2",
    name: "Dog shaped keychain",
    description: "This dog-shaped keychain serves as a compact and discreet self-defense weapon that fits right in your hand and daily life. Featuring two ergonomic finger holes and pointed ear tips, it delivers both a confident grip and powerful defensive capabilities",
    price:"30",
    image:[dog_keychain],
    category: "Self-Defence",
    date: "1716634345448",
    bestseller: true
   },
   {
    _id: "3",
    name: "dragonfly self-defense keychain",
    description: "dragonfly self-defense keychain is designed to blend beauty with utility. With a sleek dragonfly silhouette, this 3D-printable tool provides a discreet form of personal protection that’s stylish enough to wear and strong enough to rely on.",
    price: "30",
    image:[dragon_keychain],
    category: "Self-Defence",
    date:"1716634345448",
    bestseller: false
   },
   {
    _id: "4",
    name: "knuckle spike",
    description: "self-defense knuckle spike is a compact 3D-printed tool that combines the grip of brass knuckles with the precision of a pointed striker. Lightweight and easy to carry, it’s an ideal option for",
    price: "30",
    image:[knuckle_spike],
    category: "Self-Defence",
    date: "1716634345448",
    bestseller: false
   },
   {
    _id: "5",
    name: "BEEsafe keychain",
    description:"self-defence keychain",
    price: "30",
    image:[beesafe_keychain],
    category: "Self-Defence",
    date: "1716634345448",
    bestseller: false
   },
   {
    _id: "6",
    name: "Whistle Keychain -Pikachu",
    description: "Self-defense Whistle Keychain -Pikachu",
    price: "30",
    image:[whistle_keychain],
    category: "Self-Defence",
    date: "1716634345448",
    bestseller: false
   },
   {
    _id: "7",
    name: "personal self defence alarm",
    description:"personal self defence alarm",
    price: "350",
    image:[alarm],
    category: "Security",
    date: "1716634345448",
    bestseller: true
   },
   {
    _id: "8",
    name: "self-defence set",
    description: "self-defence set",
    price: "565",
    image:[piece_set, pink_set, black_set],
    category: "Self-Defence",
    date: "1716634345448",
    bestseller: true
   },
   {
    _id: "9",
    name: "Tag me",
    description: "This small, lightweight tag holds emergency information like name, medical conditions, and emergency contact details. It's designed for children, people with mental health conditions, or anyone at risk of getting lost or going missing. Easily attach it to a backpack, keys, or clothing. In an emergency, helpers can quickly access important info to contact loved ones or provide the right care.",
    price: "1",
    image:[panic_button],
    category: "Salema",
    date: "1716634345448",
    bestseller: true
   }

]
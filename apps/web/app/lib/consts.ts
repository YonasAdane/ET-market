import { CategoryType } from "./types";

export const CategoryArray:CategoryType[]= [
    "FOOTWEAR",        // For shoes, sandals, sneakers, etc.
    "CLOTHING",        // For a pparel such as shirts, trousers, dresses, etc.
    "ACCESSORY",       // For belts, hats, scarves, etc.
    "BAG",             // For handbags, backpacks, luggage, etc.
    // "JEWELLERY",       // For rings, necklaces, bracelets, etc.
    "WATCH",           // For watches and timepieces
    // "SUNGLASSES",      // For eyewear, including sunglasses
    "UNDERWEAR",       // For undergarments, lingerie, etc.
    // "SPORTSWEAR",      // For athletic clothing, gym wear, etc.
    "OUTERWEAR",       // For jackets, coats, and other outerwear
    // "SWIMWEAR",        // For swimsuits, bikinis, etc.
    // "SUIT",            // For formal suits, blazers, etc.
    // "SLEEPWEAR",       // For pajamas, nightgowns, etc.
    // "COSTUME",         // For costumes, fancy dress, etc.
    // "LOUNGEWEAR",      // For comfortable, casual wear typically worn at home
    // "MATERNITY",       // For maternity wear
    // "LEATHER_GOODS"   // For wallets, belts, and other leather accessories
]
export const filterProduct={
    CLOTHING:[
        {
            name:"size",
            value:["2S","S","M","L","XL","2XL"]
        },
        {
            name:"material",
            value:['Cotton Blend',
                'Pure Cotton',
                'Polycotton',
                'Lycra Blend',
                'Cotton Lycra',
                'Polyester',
                'Viscose Rayon',
                'Cotton Linen',
                'Cotton Silk',
                'Satin',
                'Denim',
                'Poly Viscose',
                'Corduroy',
                'Linen Blend',
                'Silk Blend',
                'Pure Linen',
                'Poly Silk',
                'Crepe',
                'Chiffon',
                'Lyocell',
                'Wool Blend',
                'Nylon',
                'Modal']
        },
        {
            name:"occasion",
            value:["Casual","Formal"]
        },
        {
            name:"season",
            value:["Summer","Winter"]
        },
    ],
    WATCH:[
        {
            name:"strapMaterial",
            value:["Leather","Metal"]
        },
        {
            name:"dialShape",
            value:["Leather","Suede"]
        },
    ],
    FOOTWEAR:[
        {
            name:"materail",
            value:["Leather","Metal"]
        },
        {
            name:"ocasion",
            value:["Casual","Formal"]
        },
    ],
    ACCESSORY:[
        {
            name:"materail",
            value:["Leather","Canvas"]
        },
        {
            name:"colour",
            value:["black","brown"]
        },
    ],
    BAG:[
        {
            name:"materail",
            value:["Leather","Fabric"]
        },
        {
            name:"purpose",
            value:["Travel","DailyUse"]
        },
        {
            name:"size",
            value:["small","medium","large"]
        },
    ],
    UNDERWEAR:[
        {
            name:"size",
            value:["S","M","L","XL"]
        },
        {
            name:"materail",
            value:["Cotton","Polyester"]
        },
        {
            name:"style",
            value:["Briefs","Boxers"]
        },
    ],
    OUTERWEAR:[
        {
            name:"materail",
            value:["Wool","Polyester"]
        },
        {
            name:"season",
            value:["Winter","Fall"]
        },
    ]


}
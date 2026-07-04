import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "./src/models/product_model.js";
// Generăm calea absolută către fișierul .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// TEST: Vedem în consolă dacă s-a încărcat
console.log("URI-ul citit din .env este:", process.env.MONGO_URI);
const hardcodedProducts = [
  {
    name: "Invitatii botez/nunta",
    description:
      "La modelul de invitație se pot adăuga contracost plicuri asortate și sigilii de ceară.",
    category: "Invitatii",
    variants: [
      { name: "Invitatie nunta", price: 2 },
      { name: "Invitație botez", price: 2 },
      { name: "Invitație aniversare", price: 2 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii0_buiqio.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii4_s87z8l.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii5_hq7wzg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii2_npovsr.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii1_eogsbn.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii6_ndnmsk.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158927/invitatii3_uqrplo.jpg",
    ],
  },
  {
    name: "Tricou/Fusta",
    description:
      "Set personalizat pentru aniversări. Tricoul este din bumbac 100%.",
    category: "Tricouri",
    variants: [
      { name: "Tricou Personalizat", price: 11 },
      { name: "Fustita", price: 20 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158960/tricouri0_sgahrk.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158960/tricouri1_wrnkep.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158961/tricouri2_avivxj.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158962/tricouri3_iyxinr.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158962/tricouri4_nm4nz5.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158962/tricouri5_y3mqav.jpg",
    ],
  },
  {
    name: "Set mot personalizat",
    description:
      "Set complet pentru tăierea moțului, personalizat cu tematica evenimentului.",
    category: "Seturi Mot",
    variants: [{ name: "Set mot personalizat", price: 60 }],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158957/set_mot0_emqouc.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158957/set_mot1_qys08k.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158958/set_mot2_zectqa.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158958/set_mot3_atr3jy.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158959/set_mot4_yu3dgv.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158959/set_mot5_rzo30y.jpg",
    ],
  },
  {
    name: "Pahare personalizate botez/nunta",
    description:
      "Pahare pictate manual sau decorate cu vinil premium pentru miri și nași.",
    category: "Pahare",
    variants: [
      { name: "Pahar nunta", price: 10 },
      { name: "Pahar botez", price: 10 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158945/pahare0_uaokve.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158946/pahare1_g13i4h.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158946/pahare2_p3frs1.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158947/pahare3_umar2k.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158947/pahare4_xgnezy.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158948/pahare5_nvu0kg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158948/pahare6_saxslu.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158949/pahare7_yn1tpd.jpg",
    ],
  },
  {
    name: "Trusou botez personalizat",
    description:
      "Trusou de botez complet, brodat cu numele copilului și data evenimentului.",
    category: "Trusouri",
    variants: [{ name: "Trusou botez personalizat", price: 145 }],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158963/trusouri0_oqa7io.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158963/trusouri1_pvinkn.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158964/trusouri10_ehbrsg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158965/trusouri11_uilwz8.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158965/trusouri12_ml73s8.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158965/trusouri12_ml73s8.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158966/trusouri13_mnlt7f.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158966/trusouri14_ei2jnd.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158967/trusouri2_ezd6cr.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158967/trusouri3_djcwne.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158967/trusouri4_jk7q1o.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158968/trusouri5_p6ds9r.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158968/trusouri6_vx1vm8.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158969/trusouri7_kf81qg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158970/trusouri9_haon5r.jpg",
    ],
  },
  {
    name: "Marturii nunta/botez",
    description:
      "Mărturii deosebite pentru a le mulțumi invitaților într-un mod dulce sau util.",
    category: "Marturii",
    variants: [
      { name: "Marturie botez/nunta magnet", price: 2 },
      { name: "Marturie botez/nunta sapun", price: 2 },
      { name: "Marturie botez/nunta bombonele", price: 2 },
      { name: "Marturie botez/nunta miere", price: 2 },
      { name: "Marturie botez/nunta Nutella", price: 2 },
      { name: "Marturie botez/nunta rasina", price: 2 },
      { name: "Marturie botez/nunta lumanare", price: 2 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158977/marturii0_ijdvun.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158977/marturii1_n0rktn.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158978/marturii10_zdzlfb.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158979/marturii11_awmqlg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158979/marturii2_fgdsuh.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158979/marturii3_a5rwrn.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158980/marturii4_ffhw7g.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158981/marturii5_a8jvj6.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158981/marturii6_il2ygl.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158981/marturii7_tovhub.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158982/marturii8_cg1d1n.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158982/marturii9_sq1tg4.jpg",
    ],
  },
  {
    name: "Seturi personalizate cadou",
    description:
      "Cutii cadou elegantes pregătite pentru a fi oferite nașilor sau părinților.",
    category: "Cadouri",
    variants: [
      { name: "Set cani", price: 55 },
      { name: "Set Sharidan's, pahare", price: 70 },
      { name: "Set licheni si plexiglas", price: 55 },
      { name: "Set Jack, Sharidan's,pahare", price: 85 },
      { name: "Set licheni, Jack, plexiglas", price: 100 },
      { name: "Set Jack, pahare si tricou", price: 80 },
      { name: "Set rama foto, papucei, licheni", price: 40 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158949/seturi0_syfvwk.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158950/seturi1_sohhxp.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158950/seturi10_ox9gya.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158951/seturi11_snf7wg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158951/seturi12_u5psyv.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158951/seturi13_ktr0cn.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158952/seturi14_dpihci.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158952/seturi15_yptird.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158953/seturi16_v2gpqk.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158953/seturi2_t6evxg.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158954/seturi3_xlvhpw.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158954/seturi4_vqkeo3.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158955/seturi5_snpt3m.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158955/seturi6_m2onu4.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158956/seturi7_cgtbti.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158956/seturi8_wlflxa.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158956/seturi9_nsqufh.jpg",
    ],
  },
  {
    name: "Lumanari botez/nunta",
    description: "Lumânări de ceară naturală sau sculptate, decorate manual.",
    category: "Lumanari",
    variants: [
      { name: "Lumanare nunta", price: 45 },
      { name: "Lumanare Botez", price: 45 },
    ],
    images: [
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158971/lumanari0_ark87c.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158971/lumanari1_jxbvlu.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158971/lumanari10_il3jyd.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158972/lumanari11_wrm6xr.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158973/lumanari2_nyzrg3.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158973/lumanari3_gihtla.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158974/lumanari4_buchbh.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158974/lumanari5_yi9ymv.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158975/lumanari6_u3mopq.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158975/lumanari7_pcroii.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158976/lumanari8_wevh59.jpg",
      "https://res.cloudinary.com/df2jajqo/image/upload/v1783158976/lumanari9_qcgm5i.jpg",
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://gabimihnea46_db_user:bPu74hQVzDFWOx18@ac-dja2z54-shard-00-00.gvfefjk.mongodb.net:27017,ac-dja2z54-shard-00-01.gvfefjk.mongodb.net:27017,ac-dja2z54-shard-00-02.gvfefjk.mongodb.net:27017/?ssl=true&replicaSet=atlas-goui5w-shard-0&authSource=admin&appName=Achievements",
    );

    console.log("Conectat la MongoDB pentru seeding...");

    await Product.deleteMany({});
    console.log("Produsele vechi au fost sterse.");

    await Product.insertMany(hardcodedProducts);
    console.log("Baza de date a fost populata cu cele 8 produse successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Eroare la seeding:", error);
  }
};

seedDB();

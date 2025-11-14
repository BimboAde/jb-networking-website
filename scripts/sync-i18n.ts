#!/usr/bin/env tsx
import fs from 'node:fs';
import path from 'node:path';

type Dict = Record<string, unknown>;

const root = process.cwd();
const enPath = path.join(root, 'src', 'messages', 'en.json');
const esPath = path.join(root, 'src', 'messages', 'es.json');

function readJson(file: string): Dict {
  const s = fs.readFileSync(file, 'utf8');
  return JSON.parse(s) as Dict;
}

function writeJson(file: string, obj: Dict) {
  const s = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(file, s, 'utf8');
}

// Minimal phrase dictionary to improve quality for common UI strings
const phraseMap = new Map<string, string>([
  ['Home', 'Inicio'],
  ['About Us', 'Acerca de Nosotros'],
  ['Locations', 'Ubicaciones'],
  ['Individuals', 'Individuos'],
  ['Businesses', 'Empresas'],
  ['Contact Us', 'Contáctenos'],
  ['Book Consultation', 'Reservar Consulta'],
  ['Book Your Expert Consultation', 'Reserve su Consulta con un Experto'],
  ['Schedule Expert Consultation', 'Programar Consulta con un Experto'],
  ['Schedule Consultation', 'Programar Consulta'],
  ['Schedule Free Consultation', 'Programar Consulta Gratuita'],
  ['Call Now', 'Llamar Ahora'],
  ['Learn More', 'Saber Más'],
  ['Read More', 'Leer Más'],
  ['Get Directions', 'Obtener Direcciones'],
  ['Submit', 'Enviar'],
  ['Download', 'Descargar'],
  ['Money Back Guarantee', 'Garantía de Devolución de Dinero'],
  ['Hablamos Español', 'Hablamos Español'],
  ['Military Discounts', 'Descuentos para Militares'],
  ['Why Choose Us', '¿Por Qué Elegirnos?'],
  ['Frequently Asked Questions', 'Preguntas Frecuentes'],
  ['Most Popular', 'Más Popular'],
  ['Featured', 'Destacado'],
  ['Price', 'Precio'],
  ['Starting at', 'Desde'],
  ['Per month', 'Por mes'],
  ['Per year', 'Por año'],
  ['Call', 'Llamar'],
  ['Email', 'Correo electrónico'],
  ['Phone', 'Teléfono'],
  ['Address', 'Dirección'],
  ['Hours', 'Horario'],
  ['Services', 'Servicios'],
  ['Service', 'Servicio'],
  ['Download Tax Checklist', 'Descargar Lista de Documentos'],
  ['Get Started', 'Comenzar'],
]);

function translateLeaf(en: string): string {
  // Try exact match
  const direct = phraseMap.get(en);
  if (direct) return direct;
  // Heuristics: keep numbers and short labels; otherwise return en (manual review later)
  if (/^\s*[\d\W]+\s*$/.test(en)) return en;
  // Basic replacements for common words
  let out = en;
  out = out.replace(/Consultation/gi, 'Consulta');
  out = out.replace(/Schedule/gi, 'Programar');
  out = out.replace(/Book/gi, 'Reservar');
  out = out.replace(/Call/gi, 'Llamar');
  out = out.replace(/Download/gi, 'Descargar');
  out = out.replace(/Learn More/gi, 'Saber Más');
  out = out.replace(/Read More/gi, 'Leer Más');
  out = out.replace(/Support/gi, 'Soporte');
  out = out.replace(/Tax/gi, 'Impuestos');
  out = out.replace(/Accounting/gi, 'Contabilidad');
  out = out.replace(/Credit/gi, 'Crédito');
  out = out.replace(/Debt/gi, 'Deuda');
  out = out.replace(/Business/gi, 'Negocios');
  out = out.replace(/Financial/gi, 'Financiero');
  out = out.replace(/Insurance/gi, 'Seguros');
  out = out.replace(/Real Estate/gi, 'Bienes Raíces');
  out = out.replace(/Mortgage/gi, 'Hipoteca');
  out = out.replace(/Executive/gi, 'Ejecutivo');
  out = out.replace(/Services?/gi, 'Servicios');
  out = out.replace(/Office/gi, 'Oficina');
  out = out.replace(/Locations?/gi, 'Ubicaciones');
  out = out.replace(/English/gi, 'Inglés');
  out = out.replace(/Spanish/gi, 'Español');
  // Return heuristic translation; manual review recommended
  return out;
}

function merge(en: unknown, es: unknown): unknown {
  if (en && typeof en === 'object' && !Array.isArray(en)) {
    const out: Dict = {};
    const enObj = en as Dict;
    const esObj = (es && typeof es === 'object' && !Array.isArray(es) ? (es as Dict) : {}) as Dict;
    for (const key of Object.keys(enObj)) {
      out[key] = merge(enObj[key], esObj[key]);
    }
    return out;
  }
  if (Array.isArray(en)) {
    // Preserve arrays; try to merge objects inside arrays, else copy
    const esArr = Array.isArray(es) ? (es as unknown[]) : [];
    return en.map((item, idx) => {
      const esItem = esArr[idx];
      if (item && typeof item === 'object') return merge(item, esItem);
      if (typeof item === 'string') {
        const candidate = typeof esItem === 'string' && esItem.trim() ? esItem : translateLeaf(item);
        return candidate;
      }
      return item;
    });
  }
  if (typeof en === 'string') {
    const esStr = typeof es === 'string' ? es : '';
    return esStr && esStr.trim() ? esStr : translateLeaf(en);
  }
  // numbers, booleans, null
  return typeof es === typeof en && es !== undefined ? es : en;
}

function main() {
  const en = readJson(enPath);
  const esExisting = fs.existsSync(esPath) ? readJson(esPath) : {};
  const merged = merge(en, esExisting) as Dict;
  writeJson(esPath, merged);
  // eslint-disable-next-line no-console
  console.log('Spanish translations synced. All keys present in es.json.');
}

main();



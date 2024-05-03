import {fs} from "mz";
import path from "node:path";

import {assertCompile} from "./util";

describe("EsJSTransformer", () => {
  it("importar", () => {
    assertCompile(
      `
      importar desde desde 'b'
      importar { desde } desde 'b'
      importar * como b desde 'b'
      importar 'b'
    `,
      `
      import desde from 'b'
      import { desde } from 'b'
      import * as b from 'b'
      import 'b'
    `,
    );
  });

  it("importar como", () => {
    assertCompile(
      `
      importar * como b desde 'b';
      importar { a como b, como como c } desde 'b';
      `,
      `
      import * as b from 'b';
      import { a as b, como as c } from 'b';
      `,
    );
  });

  it("variables", () => {
    assertCompile(
      `
      const lenguaje = 'EsJS'
      mut desde = 'EsJS'
      var hacia = 'JS'
    `,
      `
      const lenguaje = 'EsJS'
      let desde = 'EsJS'
      var hacia = 'JS'
    `,
    );
  });

  it("clase", () => {
    assertCompile(
      `
      clase Auto {
        constructor() {
          ambiente.velocidad = 0
        }
      
        acelerar() {
          ambiente.velocidad += 10
        }
      
        frenar() {
          ambiente.velocidad -= 10
        }
      }
     
      const auto = crear Auto()
        
      auto.acelerar()
    `,
      `
      class Auto {
        constructor() {
          this.velocidad = 0
        }
      
        acelerar() {
          this.velocidad += 10
        }
      
        frenar() {
          this.velocidad -= 10
        }
      }
     
      const auto = new Auto()
        
      auto.acelerar()
    `,
    );
  });

  it("asincrono", () => {
    assertCompile(
      `
      asincrono funcion funcionAsincrona() {
        intentar {
          esperar algunaOperacionAsincrona();
        } capturar (error) {
          console.error('Error:', error);
        } finalmente {
          console.log('Operación asíncrona terminada.');
        }
      }
    `,
      `
      async function funcionAsincrona() {
        try {
          await algunaOperacionAsincrona();
        } catch (error) {
          console.error('Error:', error);
        } finally {
          console.log('Operación asíncrona terminada.');
        }
      }
    `,
    );
  });

  it("exportar porDefecto", () => {
    assertCompile(
      `
        exportar porDefecto funcion hola () {
          retornar 'hola'
        }
    `,
      `
        export default function hola () {
          return 'hola'
        }
    `,
    );
  });

  it("instanciaDe", () => {
    assertCompile(
      `
        1 instanciaDe 1
        'hola' instanciaDe 'hola'
    `,
      `
        1 instanceof 1
        'hola' instanceof 'hola'
    `,
    );
  });

  it("tipoDe", () => {
    assertCompile(
      `
        const uno = tipoDe 1
        const dos = tipoDe 2
    `,
      `
        const uno = typeof 1
        const dos = typeof 2
    `,
    );
  });

  it("para de", () => {
    assertCompile(
      `
        const lista = [1, 2, 3]
        para (mut item de lista) {
        }
        para (mut de de lista) {
        }
    `,
      `
        const lista = [1, 2, 3]
        for (let item of lista) {
        }
        for (let of of lista) {
        }
    `,
    );
  });

  it("para en", () => {
    assertCompile(
      `
        const lista = [1, 2, 3]
        para (mut item en lista) {
        }
        para (const i en lista) {
        }
    `,
      `
        const lista = [1, 2, 3]
        for (let item in lista) {
        }
        for (const i in lista) {
        }
    `,
    );
  });

  it("let x = funcion", () => {
    assertCompile(
      `
        mut x = {
          f: funcion() {}
        }
        mut y = funcion() {}
    `,
      `
        let x = {
          f: function() {}
        }
        let y = function() {}
    `,
    );
  })

  it("constantes", () => {
    assertCompile(
      `
        const x = falso
        
        const y = verdadero
        
        const n = nulo
        
        const i = indefinido
        
        const I = Infinito
        
        const noNumero = NuN
        
        const aG = ambienteGlobal
      `,
      `
        const x = false
        
        const y = true
        
        const n = null
        
        const i = undefined
        
        const I = Infinity
        
        const noNumero = NaN
        
        const aG = globalThis
      `,
    );
  })

  it("fixtures", () => {
    const files = fs.readdirSync(path.join(__dirname, "fixtures"));

    for (const file of files) {
      const input = fs.readFileSync(path.join(__dirname, "fixtures", file), "utf8");
      const output = fs.readFileSync(
        path.join(__dirname, "fixtures", file.replace(".esjs", ".js")),
        "utf8",
      );

    }
  });
});

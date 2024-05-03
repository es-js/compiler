import {TokenType as tt} from "../parser/tokenizer/types";
import type TokenProcessor from "../TokenProcessor";
import Transformer from "./Transformer";
import {ContextualKeyword} from "../parser/tokenizer/keywords";

export const transforms: Map<number, string[]> = new Map([
  [tt._romper, ["romper", "break"]],
  [tt._caso, ["caso", "case"]],
  [tt._capturar, ["capturar", "catch"]],
  [tt._continuar, ["continuar", "continue"]],
  [tt._depurador, ["depurador", "debugger"]],
  [tt._porDefecto, ["porDefecto", "default"]],
  [tt._hacer, ["hacer", "do"]],
  [tt._sino, ["sino", "else"]],
  [tt._finalmente, ["finalmente", "finally"]],
  [tt._para, ["para", "for"]],
  [tt._funcion, ["funcion", "function"]],
  [tt._si, ["si", "if"]],
  [tt._retornar, ["retornar", "return"]],
  [tt._elegir, ["elegir", "switch"]],
  [tt._lanzar, ["lanzar", "throw"]],
  [tt._intentar, ["intentar", "try"]],
  [tt._mut, ["mut", "let"]],
  [tt._mientras, ["mientras", "while"]],
  [tt._con, ["con", "with"]],
  [tt._crear, ["crear", "new"]],
  [tt._ambiente, ["ambiente", "this"]],
  [tt._clase, ["clase", "class"]],
  [tt._extiende, ["extiende", "extends"]],
  [tt._exportar, ["exportar", "export"]],
  [tt._importar, ["importar", "import"]],
  [tt._producir, ["producir", "yield"]],
  [tt._nulo, ["nulo", "null"]],
  [tt._verdadero, ["verdadero", "true"]],
  [tt._falso, ["falso", "false"]],
  [tt._en, ["en", "in"]],
  [tt._instanciaDe, ["instanciaDe", "instanceof"]],
  [tt._tipoDe, ["tipoDe", "typeof"]],
  [tt._vacio, ["vacio", "void"]],
  [tt._eliminar, ["eliminar", "delete"]],
  [tt._asincrono, ["asincrono", "async"]],
]);

const replacements = new Map([
  ["asincrono", "async"],
  ["esperar", "await"],
  ["de", "of"],
  ["funcion", "function"],
  ["indefinido", "undefined"],
  ["Infinito", "Infinity"],
  ["ambienteGlobal", "globalThis"],
  ["NuN", "NaN"],
]);

export interface EsJSTransformerOptions {
  from: 'esjs' | 'js';
  to: 'esjs' | 'js';
}

export default class EsJSTransformer extends Transformer {
  options: EsJSTransformerOptions;

  constructor(readonly tokens: TokenProcessor, options: EsJSTransformerOptions = {
    from: 'esjs',
    to: 'js',
  }) {
    super();

    this.options = options;

    // console.log({
    //     from: this.options.from,
    //     to: this.options.to,
    // })

    tokens.setToLanguage(this.options.to);
  }

  process(): boolean {
    const code = this.tokens.currentTokenCode();

    // const token = this.tokens.currentToken();
    // const tokenName = tt[token.type];
    // console.log({
    //     token: token.type,
    //     tokenName,
    //     code,
    // })

    if (this.options.to === 'js' && this.processToJS()) {
      return true;
    }

    if (this.options.to === 'esjs' && this.processToEsJS()) {
      return true;
    }

    if (this.replaceFromMap(replacements, code)) {
      return true;
    }

    return this.replaceTokens(transforms);
  }

  processToJS(): boolean {
    if (this.tokens.matches1(tt._importar)) {
      this.tokens.replaceToken("import");

      if (this.tokens.matches1(tt.star)) {
        this.tokens.replaceToken("*");
      }

      const names = [];
      while (
          this.tokens.matches1(tt.name) ||
          this.tokens.matches1(tt.braceL) ||
          this.tokens.matches1(tt.comma) ||
          this.tokens.matches1(tt.braceR)
          ) {
        const contextualKeyword = this.tokens.currentToken().contextualKeyword;
        const code = this.tokens.currentTokenCode();

        if (contextualKeyword === ContextualKeyword._como) {
          names.push(this.tokens.previousWhitespaceAndComments() + "as");
          this.tokens.nextToken();
        } else {
          names.push(this.tokens.previousWhitespaceAndComments() + code);
          this.tokens.nextToken();
        }
      }

      if (names) {
        for (let i = 0; i < names.length - 1; i++) {
          this.tokens.appendCode(`${names[i]}`);
        }

        const lastNamed = names[names.length - 1]
        if (lastNamed && (lastNamed.trim() === "desde" || lastNamed.trim() === "from")) {
          this.tokens.appendCode(names[names.length - 1].replace("desde", "from"));
        }
      }

      return true;
    }

    return false;
  }

  processToEsJS(): boolean {
    if (this.tokens.matches1(tt._importar)) {
      this.tokens.replaceToken("importar");

      if (this.tokens.matches1(tt.star)) {
        this.tokens.replaceToken("*");
      }

      const names = [];
      while (
          this.tokens.matches1(tt.name) ||
          this.tokens.matches1(tt.braceL) ||
          this.tokens.matches1(tt.comma) ||
          this.tokens.matches1(tt.braceR)
          ) {
        const contextualKeyword = this.tokens.currentToken().contextualKeyword;
        const code = this.tokens.currentTokenCode();

        if (contextualKeyword === ContextualKeyword._como) {
          names.push(this.tokens.previousWhitespaceAndComments() + "como");
          this.tokens.nextToken();
        } else {
          names.push(this.tokens.previousWhitespaceAndComments() + code);
          this.tokens.nextToken();
        }
      }

      if (names) {
        for (let i = 0; i < names.length - 1; i++) {
          this.tokens.appendCode(`${names[i]}`);
        }

        const lastNamed = names[names.length - 1]
        if (lastNamed && (lastNamed.trim() === "desde" || lastNamed.trim() === "from")) {
          this.tokens.appendCode(names[names.length - 1].replace("from", "desde"));
        }
      }

      return true;
    }

    return false;
  }

  replaceFromMap(replacements: Map<string, string>, code: string): boolean {
    for (const [esjs, js] of replacements) {
      const key = this.options.from === 'esjs' ? esjs : js;
      const value = this.options.to === 'esjs' ? esjs : js;

      if (this.tokens.matches1(tt.name) && code === key) {
        this.tokens.replaceToken(value);
        return true;
      }
    }
    return false;
  }

  replaceTokens(replacements: Map<number, string[]>): boolean {
    const tokens = Array.from(replacements.keys());

    for (let i = 0; i < tokens.length; i++) {
      if (this.tokens.matches1(tokens[i])) {
        const values = replacements.get(tokens[i]);

        if (!values) {
          return false;
        }

        // @ts-ignore
        this.tokens.replaceToken(values[this.options.to === 'esjs' ? 0 : 1])
        return true;
      }
    }

    return false;
  }
}

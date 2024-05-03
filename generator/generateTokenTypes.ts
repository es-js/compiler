const isAssign = true;
const prefix = true;
const postfix = true;
const startsExpr = true;

interface TokenOptions {
  keyword?: string;
  rightAssociative?: boolean;
  isAssign?: boolean;
  prefix?: boolean;
  postfix?: boolean;
  startsExpr?: boolean;
  binop?: number;
}

class TokenType {
  label: string;
  keyword?: string;
  rightAssociative: boolean;
  isAssign: boolean;
  prefix: boolean;
  postfix: boolean;
  startsExpr: boolean;
  binop: number | null;

  constructor(label: string, conf: TokenOptions = {}) {
    this.label = label;
    this.keyword = conf.keyword;
    this.rightAssociative = !!conf.rightAssociative;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.startsExpr = !!conf.startsExpr;
    this.binop = conf.binop === 0 ? 0 : conf.binop || null;
  }
}

class KeywordTokenType extends TokenType {
  constructor(name: string, options: TokenOptions = {}) {
    options.keyword = name;

    super(name, options);
  }
}

class BinopTokenType extends TokenType {
  constructor(name: string, prec: number, options: TokenOptions = {}) {
    super(name, {binop: prec, ...options});
  }
}

const types = {
  num: new TokenType("num", {startsExpr}),
  bigint: new TokenType("bigint", {startsExpr}),
  decimal: new TokenType("decimal", {startsExpr}),
  regexp: new TokenType("regexp", {startsExpr}),
  string: new TokenType("string", {startsExpr}),
  name: new TokenType("name", {startsExpr}),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {startsExpr}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {startsExpr}),
  braceBarL: new TokenType("{|", {startsExpr}),
  braceR: new TokenType("}"),
  braceBarR: new TokenType("|}"),
  parenL: new TokenType("(", {startsExpr}),
  parenR: new TokenType(")"),
  comma: new TokenType(","),
  semi: new TokenType(";"),
  colon: new TokenType(":"),
  doubleColon: new TokenType("::"),
  dot: new TokenType("."),
  question: new TokenType("?"),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>"),
  template: new TokenType("template"),
  ellipsis: new TokenType("..."),
  backQuote: new TokenType("`"),
  dollarBraceL: new TokenType("${", {startsExpr}),
  at: new TokenType("@"),
  hash: new TokenType("#", {startsExpr}),

  eq: new TokenType("=", {isAssign}),
  assign: new TokenType("_=", {isAssign}),
  // Mark the token as either prefix or postfix for the parser; we later assign
  // based on what we find.
  preIncDec: new TokenType("++/--", {prefix, postfix, startsExpr}),
  postIncDec: new TokenType("++/--", {prefix, postfix, startsExpr}),
  bang: new TokenType("!", {prefix, startsExpr}),
  tilde: new TokenType("~", {prefix, startsExpr}),
  pipeline: new BinopTokenType("|>", 0),
  nullishCoalescing: new BinopTokenType("??", 1),
  logicalOR: new BinopTokenType("||", 1),
  logicalAND: new BinopTokenType("&&", 2),
  bitwiseOR: new BinopTokenType("|", 3),
  bitwiseXOR: new BinopTokenType("^", 4),
  bitwiseAND: new BinopTokenType("&", 5),
  equality: new BinopTokenType("==/!=", 6),
  lessThan: new BinopTokenType("<", 7),
  greaterThan: new BinopTokenType(">", 7),
  relationalOrEqual: new BinopTokenType("<=/>=", 7),
  bitShiftL: new BinopTokenType("<<", 8),
  bitShiftR: new BinopTokenType(">>/>>>", 8),
  plus: new TokenType("+", {binop: 9, prefix, startsExpr}),
  minus: new TokenType("-", {binop: 9, prefix, startsExpr}),
  modulo: new BinopTokenType("%", 10, {startsExpr}),
  star: new BinopTokenType("*", 10),
  slash: new BinopTokenType("/", 10),
  exponent: new TokenType("**", {binop: 11, rightAssociative: true}),

  jsxName: new TokenType("jsxName"),
  jsxText: new TokenType("jsxText"),
  jsxEmptyText: new TokenType("jsxEmptyText"),
  jsxTagStart: new TokenType("jsxTagStart", {startsExpr}),
  jsxTagEnd: new TokenType("jsxTagEnd"),
  typeParameterStart: new TokenType("typeParameterStart", {startsExpr}),
  nonNullAssertion: new TokenType("nonNullAssertion"),

  // keywords
  _break: new KeywordTokenType("break"),
  _case: new KeywordTokenType("case"),
  _catch: new KeywordTokenType("catch"),
  _continue: new KeywordTokenType("continue"),
  _debugger: new KeywordTokenType("debugger"),
  _default: new KeywordTokenType("default"),
  _do: new KeywordTokenType("do"),
  _else: new KeywordTokenType("else"),
  _finally: new KeywordTokenType("finally"),
  _for: new KeywordTokenType("for"),
  _function: new KeywordTokenType("function", {startsExpr}),
  _if: new KeywordTokenType("if"),
  _return: new KeywordTokenType("return"),
  _switch: new KeywordTokenType("switch"),
  _throw: new KeywordTokenType("throw", {prefix, startsExpr}),
  _try: new KeywordTokenType("try"),
  _var: new KeywordTokenType("var"),
  _let: new KeywordTokenType("let"),
  _const: new KeywordTokenType("const"),
  _while: new KeywordTokenType("while"),
  _with: new KeywordTokenType("with"),
  _new: new KeywordTokenType("new", {startsExpr}),
  _this: new KeywordTokenType("this", {startsExpr}),
  _super: new KeywordTokenType("super", {startsExpr}),
  _class: new KeywordTokenType("class", {startsExpr}),
  _extends: new KeywordTokenType("extends"),
  _export: new KeywordTokenType("export"),
  _import: new KeywordTokenType("import", {startsExpr}),
  _yield: new KeywordTokenType("yield", {startsExpr}),
  _null: new KeywordTokenType("null", {startsExpr}),
  _true: new KeywordTokenType("true", {startsExpr}),
  _false: new KeywordTokenType("false", {startsExpr}),
  _in: new KeywordTokenType("in", {binop: 7}),
  _instanceof: new KeywordTokenType("instanceof", {binop: 7}),
  _typeof: new KeywordTokenType("typeof", {prefix, startsExpr}),
  _void: new KeywordTokenType("void", {prefix, startsExpr}),
  _delete: new KeywordTokenType("delete", {prefix, startsExpr}),

  // Other keywords
  _async: new KeywordTokenType("async", {startsExpr}),
  _get: new KeywordTokenType("get", {startsExpr}),
  _set: new KeywordTokenType("set", {startsExpr}),

  // TypeScript keywords
  _declare: new KeywordTokenType("declare", {startsExpr}),
  _readonly: new KeywordTokenType("readonly", {startsExpr}),
  _abstract: new KeywordTokenType("abstract", {startsExpr}),
  _static: new KeywordTokenType("static", {startsExpr}),
  _public: new KeywordTokenType("public"),
  _private: new KeywordTokenType("private"),
  _protected: new KeywordTokenType("protected"),
  _override: new KeywordTokenType("override"),
  _as: new KeywordTokenType("as", {startsExpr}),
  _enum: new KeywordTokenType("enum", {startsExpr}),
  _type: new KeywordTokenType("type", {startsExpr}),
  _implements: new KeywordTokenType("implements", {startsExpr}),

  // EsJS Keywords
  _romper: new KeywordTokenType("esjs:break"),
  _caso: new KeywordTokenType("esjs:case"),
  _capturar: new KeywordTokenType("esjs:catch"),
  _continuar: new KeywordTokenType("esjs:continue"),
  _depurador: new KeywordTokenType("esjs:debugger"),
  _porDefecto: new KeywordTokenType("esjs:default"),
  _hacer: new KeywordTokenType("esjs:do"),
  _sino: new KeywordTokenType("esjs:else"),
  _finalmente: new KeywordTokenType("esjs:finally"),
  _para: new KeywordTokenType("esjs:for"),
  _funcion: new KeywordTokenType("esjs:function", {startsExpr}),
  _si: new KeywordTokenType("esjs:if"),
  _retornar: new KeywordTokenType("esjs:return"),
  _elegir: new KeywordTokenType("esjs:switch"),
  _lanzar: new KeywordTokenType("esjs:throw", {prefix, startsExpr}),
  _intentar: new KeywordTokenType("esjs:try"),
  // _var: new KeywordTokenType("esjs:var"),
  _mut: new KeywordTokenType("esjs:let"),
  // _const: new KeywordTokenType("esjs:const"),
  _mientras: new KeywordTokenType("esjs:while"),
  _con: new KeywordTokenType("esjs:with"),
  _crear: new KeywordTokenType("esjs:new", {startsExpr}),
  _ambiente: new KeywordTokenType("esjs:this", {startsExpr}),
  // _super: new KeywordTokenType("esjs:super", {startsExpr}),
  _clase: new KeywordTokenType("esjs:class", {startsExpr}),
  _extiende: new KeywordTokenType("esjs:extends"),
  _exportar: new KeywordTokenType("esjs:export"),
  _importar: new KeywordTokenType("esjs:import", {startsExpr}),
  _producir: new KeywordTokenType("esjs:yield", {startsExpr}),
  _nulo: new KeywordTokenType("esjs:null", {startsExpr}),
  _verdadero: new KeywordTokenType("esjs:true", {startsExpr}),
  _falso: new KeywordTokenType("esjs:false", {startsExpr}),
  _en: new KeywordTokenType("esjs:in", {binop: 7}),
  _instanciaDe: new KeywordTokenType("esjs:instanceof", {binop: 7}),
  _tipoDe: new KeywordTokenType("esjs:typeof", {prefix, startsExpr}),
  _vacio: new KeywordTokenType("esjs:void", {prefix, startsExpr}),
  _eliminar: new KeywordTokenType("esjs:delete", {prefix, startsExpr}),
  _asincrono: new KeywordTokenType("esjs:async", {startsExpr}),
  // _get: new KeywordTokenType("esjs:get", {startsExpr}),
  // _set: new KeywordTokenType("esjs:set", {startsExpr}),
  // _declare: new KeywordTokenType("esjs:declare", {startsExpr}),
  // _readonly: new KeywordTokenType("esjs:readonly", {startsExpr}),
  // _abstract: new KeywordTokenType("esjs:abstract", {startsExpr}),
  // _static: new KeywordTokenType("esjs:static", {startsExpr}),
  // _public: new KeywordTokenType("esjs:public"),
  // _private: new KeywordTokenType("esjs:private"),
  // _protected: new KeywordTokenType("esjs:protected"),
  // _override: new KeywordTokenType("esjs:override"),
  _como: new KeywordTokenType("esjs:as", {startsExpr}),
  // _enum: new KeywordTokenType("esjs:enum", {startsExpr}),
  // _type: new KeywordTokenType("esjs:type", {startsExpr}),
  _implementa: new KeywordTokenType("esjs:implements", {startsExpr}),
};

export default function generateTokenTypes(): string {
  let code = '// Generated file, do not edit! Run "yarn generate" to re-generate this file.\n';
  // formatTokenType is trivial and used for debugging purposes, so we shouldn't
  // need full test coverage.
  code += "/* istanbul ignore file */\n";
  code += generateTokenTypeEnum();
  code += generateFormatTokenType();
  return code;
}

function generateTokenTypeEnum(): string {
  let code = `\
/**
 * Enum of all token types, with bit fields to signify meaningful properties.
 */
export enum TokenType {
  // Precedence 0 means not an operator; otherwise it is a positive number up to 12.
  PRECEDENCE_MASK = 0xf,
  IS_KEYWORD = 1 << 4,
  IS_ASSIGN = 1 << 5,
  IS_RIGHT_ASSOCIATIVE = 1 << 6,
  IS_PREFIX = 1 << 7,
  IS_POSTFIX = 1 << 8,
  IS_EXPRESSION_START = 1 << 9,

`;
  // Precedence 0 means not an operator; otherwise it is a positive number up to 12.
  const PRECEDENCE_UNIT = 1;
  const IS_KEYWORD = 1 << 4;
  const IS_ASSIGN = 1 << 5;
  const IS_RIGHT_ASSOCIATIVE = 1 << 6;
  const IS_PREFIX = 1 << 7;
  const IS_POSTFIX = 1 << 8;
  const IS_EXPRESSION_START = 1 << 9;
  const TOKEN_INDEX = 1 << 10;

  let count = 0;
  for (const [name, tokenType] of Object.entries(types)) {
    let value = 0;
    const descriptions = [tokenType.label];

    if (descriptions[0].startsWith("esjs:")) {
      const jsName = `_${descriptions[0].substring(5)}`;
      const matchResult = code.match(new RegExp(`${jsName} = (\\d+),`));
      if (matchResult !== null) {
        const jsValue = matchResult[1];
        code += `  ${name} = ${jsValue}, // ${descriptions.join(" ")}\n`;
      } else {
        console.error(`Error: ${jsName} not found`);
      }
      continue;
    }

    value += count * TOKEN_INDEX;
    if (tokenType.binop !== null) {
      // Unspecified precedence is 0, so we need to start from 1.
      value |= PRECEDENCE_UNIT * (tokenType.binop + 1);
      descriptions.push(`prec:${tokenType.binop + 1}`);
    }
    if (tokenType.keyword) {
      value |= IS_KEYWORD;
      descriptions.push("keyword");
    }
    if (tokenType.isAssign) {
      value |= IS_ASSIGN;
      descriptions.push("isAssign");
    }
    if (tokenType.rightAssociative) {
      value |= IS_RIGHT_ASSOCIATIVE;
      descriptions.push("rightAssociative");
    }
    if (tokenType.prefix) {
      value |= IS_PREFIX;
      descriptions.push("prefix");
    }
    if (tokenType.postfix) {
      value |= IS_POSTFIX;
      descriptions.push("postfix");
    }
    if (tokenType.startsExpr) {
      value |= IS_EXPRESSION_START;
      descriptions.push("startsExpr");
    }
    code += `  ${name} = ${value}, // ${descriptions.join(" ")}\n`;
    count++;
  }
  code += "}\n";
  return code;
}

function generateFormatTokenType(): string {
  let code = `\
export function formatTokenType(tokenType: TokenType): string {
  switch (tokenType) {
`;
  for (const [name, tokenType] of Object.entries(types)) {
    code += `\
    case TokenType.${name}:
      return "${tokenType.label}";
`;
  }
  code += `\
    default:
      return "";
  }
}
`;
  return code;
}

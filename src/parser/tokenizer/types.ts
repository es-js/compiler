// Generated file, do not edit! Run "yarn generate" to re-generate this file.
/* istanbul ignore file */
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

  num = 512, // num startsExpr
  bigint = 1536, // bigint startsExpr
  decimal = 2560, // decimal startsExpr
  regexp = 3584, // regexp startsExpr
  string = 4608, // string startsExpr
  name = 5632, // name startsExpr
  eof = 6144, // eof
  bracketL = 7680, // [ startsExpr
  bracketR = 8192, // ]
  braceL = 9728, // { startsExpr
  braceBarL = 10752, // {| startsExpr
  braceR = 11264, // }
  braceBarR = 12288, // |}
  parenL = 13824, // ( startsExpr
  parenR = 14336, // )
  comma = 15360, // ,
  semi = 16384, // ;
  colon = 17408, // :
  doubleColon = 18432, // ::
  dot = 19456, // .
  question = 20480, // ?
  questionDot = 21504, // ?.
  arrow = 22528, // =>
  template = 23552, // template
  ellipsis = 24576, // ...
  backQuote = 25600, // `
  dollarBraceL = 27136, // ${ startsExpr
  at = 27648, // @
  hash = 29184, // # startsExpr
  eq = 29728, // = isAssign
  assign = 30752, // _= isAssign
  preIncDec = 32640, // ++/-- prefix postfix startsExpr
  postIncDec = 33664, // ++/-- prefix postfix startsExpr
  bang = 34432, // ! prefix startsExpr
  tilde = 35456, // ~ prefix startsExpr
  pipeline = 35841, // |> prec:1
  nullishCoalescing = 36866, // ?? prec:2
  logicalOR = 37890, // || prec:2
  logicalAND = 38915, // && prec:3
  bitwiseOR = 39940, // | prec:4
  bitwiseXOR = 40965, // ^ prec:5
  bitwiseAND = 41990, // & prec:6
  equality = 43015, // ==/!= prec:7
  lessThan = 44040, // < prec:8
  greaterThan = 45064, // > prec:8
  relationalOrEqual = 46088, // <=/>= prec:8
  bitShiftL = 47113, // << prec:9
  bitShiftR = 48137, // >>/>>> prec:9
  plus = 49802, // + prec:10 prefix startsExpr
  minus = 50826, // - prec:10 prefix startsExpr
  modulo = 51723, // % prec:11 startsExpr
  star = 52235, // * prec:11
  slash = 53259, // / prec:11
  exponent = 54348, // ** prec:12 rightAssociative
  jsxName = 55296, // jsxName
  jsxText = 56320, // jsxText
  jsxEmptyText = 57344, // jsxEmptyText
  jsxTagStart = 58880, // jsxTagStart startsExpr
  jsxTagEnd = 59392, // jsxTagEnd
  typeParameterStart = 60928, // typeParameterStart startsExpr
  nonNullAssertion = 61440, // nonNullAssertion
  _break = 62480, // break keyword
  _case = 63504, // case keyword
  _catch = 64528, // catch keyword
  _continue = 65552, // continue keyword
  _debugger = 66576, // debugger keyword
  _default = 67600, // default keyword
  _do = 68624, // do keyword
  _else = 69648, // else keyword
  _finally = 70672, // finally keyword
  _for = 71696, // for keyword
  _function = 73232, // function keyword startsExpr
  _if = 73744, // if keyword
  _return = 74768, // return keyword
  _switch = 75792, // switch keyword
  _throw = 77456, // throw keyword prefix startsExpr
  _try = 77840, // try keyword
  _var = 78864, // var keyword
  _let = 79888, // let keyword
  _const = 80912, // const keyword
  _while = 81936, // while keyword
  _with = 82960, // with keyword
  _new = 84496, // new keyword startsExpr
  _this = 85520, // this keyword startsExpr
  _super = 86544, // super keyword startsExpr
  _class = 87568, // class keyword startsExpr
  _extends = 88080, // extends keyword
  _export = 89104, // export keyword
  _import = 90640, // import keyword startsExpr
  _yield = 91664, // yield keyword startsExpr
  _null = 92688, // null keyword startsExpr
  _true = 93712, // true keyword startsExpr
  _false = 94736, // false keyword startsExpr
  _in = 95256, // in prec:8 keyword
  _instanceof = 96280, // instanceof prec:8 keyword
  _typeof = 97936, // typeof keyword prefix startsExpr
  _void = 98960, // void keyword prefix startsExpr
  _delete = 99984, // delete keyword prefix startsExpr
  _async = 100880, // async keyword startsExpr
  _get = 101904, // get keyword startsExpr
  _set = 102928, // set keyword startsExpr
  _declare = 103952, // declare keyword startsExpr
  _readonly = 104976, // readonly keyword startsExpr
  _abstract = 106000, // abstract keyword startsExpr
  _static = 107024, // static keyword startsExpr
  _public = 107536, // public keyword
  _private = 108560, // private keyword
  _protected = 109584, // protected keyword
  _override = 110608, // override keyword
  _as = 112144, // as keyword startsExpr
  _enum = 113168, // enum keyword startsExpr
  _type = 114192, // type keyword startsExpr
  _implements = 115216, // implements keyword startsExpr
  _romper = 62480, // esjs:break
  _caso = 63504, // esjs:case
  _capturar = 64528, // esjs:catch
  _continuar = 65552, // esjs:continue
  _depurador = 66576, // esjs:debugger
  _porDefecto = 67600, // esjs:default
  _hacer = 68624, // esjs:do
  _sino = 69648, // esjs:else
  _finalmente = 70672, // esjs:finally
  _para = 71696, // esjs:for
  _funcion = 73232, // esjs:function
  _si = 73744, // esjs:if
  _retornar = 74768, // esjs:return
  _elegir = 75792, // esjs:switch
  _lanzar = 77456, // esjs:throw
  _intentar = 77840, // esjs:try
  _mut = 79888, // esjs:let
  _mientras = 81936, // esjs:while
  _con = 82960, // esjs:with
  _crear = 84496, // esjs:new
  _ambiente = 85520, // esjs:this
  _clase = 87568, // esjs:class
  _extiende = 88080, // esjs:extends
  _exportar = 89104, // esjs:export
  _importar = 90640, // esjs:import
  _producir = 91664, // esjs:yield
  _nulo = 92688, // esjs:null
  _verdadero = 93712, // esjs:true
  _falso = 94736, // esjs:false
  _en = 95256, // esjs:in
  _instanciaDe = 96280, // esjs:instanceof
  _tipoDe = 97936, // esjs:typeof
  _vacio = 98960, // esjs:void
  _eliminar = 99984, // esjs:delete
  _asincrono = 100880, // esjs:async
  _como = 112144, // esjs:as
  _implementa = 115216, // esjs:implements
}
export function formatTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case TokenType.num:
      return "num";
    case TokenType.bigint:
      return "bigint";
    case TokenType.decimal:
      return "decimal";
    case TokenType.regexp:
      return "regexp";
    case TokenType.string:
      return "string";
    case TokenType.name:
      return "name";
    case TokenType.eof:
      return "eof";
    case TokenType.bracketL:
      return "[";
    case TokenType.bracketR:
      return "]";
    case TokenType.braceL:
      return "{";
    case TokenType.braceBarL:
      return "{|";
    case TokenType.braceR:
      return "}";
    case TokenType.braceBarR:
      return "|}";
    case TokenType.parenL:
      return "(";
    case TokenType.parenR:
      return ")";
    case TokenType.comma:
      return ",";
    case TokenType.semi:
      return ";";
    case TokenType.colon:
      return ":";
    case TokenType.doubleColon:
      return "::";
    case TokenType.dot:
      return ".";
    case TokenType.question:
      return "?";
    case TokenType.questionDot:
      return "?.";
    case TokenType.arrow:
      return "=>";
    case TokenType.template:
      return "template";
    case TokenType.ellipsis:
      return "...";
    case TokenType.backQuote:
      return "`";
    case TokenType.dollarBraceL:
      return "${";
    case TokenType.at:
      return "@";
    case TokenType.hash:
      return "#";
    case TokenType.eq:
      return "=";
    case TokenType.assign:
      return "_=";
    case TokenType.preIncDec:
      return "++/--";
    case TokenType.postIncDec:
      return "++/--";
    case TokenType.bang:
      return "!";
    case TokenType.tilde:
      return "~";
    case TokenType.pipeline:
      return "|>";
    case TokenType.nullishCoalescing:
      return "??";
    case TokenType.logicalOR:
      return "||";
    case TokenType.logicalAND:
      return "&&";
    case TokenType.bitwiseOR:
      return "|";
    case TokenType.bitwiseXOR:
      return "^";
    case TokenType.bitwiseAND:
      return "&";
    case TokenType.equality:
      return "==/!=";
    case TokenType.lessThan:
      return "<";
    case TokenType.greaterThan:
      return ">";
    case TokenType.relationalOrEqual:
      return "<=/>=";
    case TokenType.bitShiftL:
      return "<<";
    case TokenType.bitShiftR:
      return ">>/>>>";
    case TokenType.plus:
      return "+";
    case TokenType.minus:
      return "-";
    case TokenType.modulo:
      return "%";
    case TokenType.star:
      return "*";
    case TokenType.slash:
      return "/";
    case TokenType.exponent:
      return "**";
    case TokenType.jsxName:
      return "jsxName";
    case TokenType.jsxText:
      return "jsxText";
    case TokenType.jsxEmptyText:
      return "jsxEmptyText";
    case TokenType.jsxTagStart:
      return "jsxTagStart";
    case TokenType.jsxTagEnd:
      return "jsxTagEnd";
    case TokenType.typeParameterStart:
      return "typeParameterStart";
    case TokenType.nonNullAssertion:
      return "nonNullAssertion";
    case TokenType._break:
      return "break";
    case TokenType._case:
      return "case";
    case TokenType._catch:
      return "catch";
    case TokenType._continue:
      return "continue";
    case TokenType._debugger:
      return "debugger";
    case TokenType._default:
      return "default";
    case TokenType._do:
      return "do";
    case TokenType._else:
      return "else";
    case TokenType._finally:
      return "finally";
    case TokenType._for:
      return "for";
    case TokenType._function:
      return "function";
    case TokenType._if:
      return "if";
    case TokenType._return:
      return "return";
    case TokenType._switch:
      return "switch";
    case TokenType._throw:
      return "throw";
    case TokenType._try:
      return "try";
    case TokenType._var:
      return "var";
    case TokenType._let:
      return "let";
    case TokenType._const:
      return "const";
    case TokenType._while:
      return "while";
    case TokenType._with:
      return "with";
    case TokenType._new:
      return "new";
    case TokenType._this:
      return "this";
    case TokenType._super:
      return "super";
    case TokenType._class:
      return "class";
    case TokenType._extends:
      return "extends";
    case TokenType._export:
      return "export";
    case TokenType._import:
      return "import";
    case TokenType._yield:
      return "yield";
    case TokenType._null:
      return "null";
    case TokenType._true:
      return "true";
    case TokenType._false:
      return "false";
    case TokenType._in:
      return "in";
    case TokenType._instanceof:
      return "instanceof";
    case TokenType._typeof:
      return "typeof";
    case TokenType._void:
      return "void";
    case TokenType._delete:
      return "delete";
    case TokenType._async:
      return "async";
    case TokenType._get:
      return "get";
    case TokenType._set:
      return "set";
    case TokenType._declare:
      return "declare";
    case TokenType._readonly:
      return "readonly";
    case TokenType._abstract:
      return "abstract";
    case TokenType._static:
      return "static";
    case TokenType._public:
      return "public";
    case TokenType._private:
      return "private";
    case TokenType._protected:
      return "protected";
    case TokenType._override:
      return "override";
    case TokenType._as:
      return "as";
    case TokenType._enum:
      return "enum";
    case TokenType._type:
      return "type";
    case TokenType._implements:
      return "implements";
    case TokenType._romper:
      return "esjs:break";
    case TokenType._caso:
      return "esjs:case";
    case TokenType._capturar:
      return "esjs:catch";
    case TokenType._continuar:
      return "esjs:continue";
    case TokenType._depurador:
      return "esjs:debugger";
    case TokenType._porDefecto:
      return "esjs:default";
    case TokenType._hacer:
      return "esjs:do";
    case TokenType._sino:
      return "esjs:else";
    case TokenType._finalmente:
      return "esjs:finally";
    case TokenType._para:
      return "esjs:for";
    case TokenType._funcion:
      return "esjs:function";
    case TokenType._si:
      return "esjs:if";
    case TokenType._retornar:
      return "esjs:return";
    case TokenType._elegir:
      return "esjs:switch";
    case TokenType._lanzar:
      return "esjs:throw";
    case TokenType._intentar:
      return "esjs:try";
    case TokenType._mut:
      return "esjs:let";
    case TokenType._mientras:
      return "esjs:while";
    case TokenType._con:
      return "esjs:with";
    case TokenType._crear:
      return "esjs:new";
    case TokenType._ambiente:
      return "esjs:this";
    case TokenType._clase:
      return "esjs:class";
    case TokenType._extiende:
      return "esjs:extends";
    case TokenType._exportar:
      return "esjs:export";
    case TokenType._importar:
      return "esjs:import";
    case TokenType._producir:
      return "esjs:yield";
    case TokenType._nulo:
      return "esjs:null";
    case TokenType._verdadero:
      return "esjs:true";
    case TokenType._falso:
      return "esjs:false";
    case TokenType._en:
      return "esjs:in";
    case TokenType._instanciaDe:
      return "esjs:instanceof";
    case TokenType._tipoDe:
      return "esjs:typeof";
    case TokenType._vacio:
      return "esjs:void";
    case TokenType._eliminar:
      return "esjs:delete";
    case TokenType._asincrono:
      return "esjs:async";
    case TokenType._como:
      return "esjs:as";
    case TokenType._implementa:
      return "esjs:implements";
    default:
      return "";
  }
}

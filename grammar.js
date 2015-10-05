Turtle rt: n [self turnBy: n].
Turtle lt: n [self turnBy: n negated].
Turtle fd: n [self forwardBy: n].
Turtle bk: n [self forwardBy: n negated].
Turtle pu    [self setPenDown: false].
Turtle pd    [self setPenDown: true].

ometa LogoTranslator : Parser {
  name         ::= <spaces> <firstAndRest #letter #letterOrDigit>:xs => [xs squish join: ''].
  cmdName      ::= <name>:n
                     ?[n ~= 'to'] ?[n ~= 'end'] ?[n ~= 'output']     => [n].
  number       ::= <spaces> <digit>+.
  arg          ::= <token ':'> <name>.
  cmds         ::= <cmd>*:xs                                         => [xs delimWith: ';'].
  block        ::= <token '['> <cmds>:xs <token ']'>                 => ['(function() {',, xs,, '})'].
  primExpr     ::= <arg> | <number> | <block>
                 | <token '('> (<expr> | <cmd>):x <token ')'>        => [x].
  mulExpr      ::= <mulExpr>:x <token '*'> <primExpr>:y              => [x,, '*',, y]
                 | <mulExpr>:x <token '/'> <primExpr>:y              => [x,, '/',, y]
                 | <primExpr>.
  addExpr      ::= <addExpr>:x <token '+'> <mulExpr>:y               => [x,, '+',, y]
                 | <addExpr>:x <token '-'> <mulExpr>:y               => [x,, '-',, y]
                 | <mulExpr>.
  relExpr      ::= <addExpr>:x <token '<'>  <addExpr>:y              => [x,, '<',, y]
                 | <addExpr>:x <token '<='> <addExpr>:y              => [x,, '<=',, y]
                 | <addExpr>:x <token '>'>  <addExpr>:y              => [x,, '>',, y]
                 | <addExpr>:x <token '>='> <addExpr>:y              => [x,, '>=',, y]
                 | <addExpr>.
  expr         ::= <relExpr>.
  cmd          ::= <token 'output'> <expr>:x                         => ['return ',, x]
                 | <cmdName>:n <expr>*:args                          => ['$elf.performwithArguments("',, n,, '", [',,
                                                                             (args delimWith: ','),,
                                                                          '])'].
  decl         ::= <token 'to'> <cmdName>:n <arg>*:args
                     <cmds>:body  <token 'end'>                      => ['$elf.',, n,, ' = ',,
                                                                           'function(',, (args delimWith: ','),, ') {',,
                                                                             body,,
                                                                           '}'].
  topLevelCmd  ::= <decl> | <cmd>.
  topLevelCmds ::= <topLevelCmd>*:xs <spaces> <end>                  => [xs := '(function() { var $elf = this; ',,
                                                                                 (xs delimWith: ';'),, '})'.
                                                                         xs squish join: ''].
}.

Turtle eval: code [
  | trans |
  trans := LogoTranslator matchAll: code with: #topLevelCmds.
  self at: #LOGODOIT put: (eval value: trans).
  self LOGODOIT
].

Turtle if: cond : aBlock [
  cond ifTrue: aBlock
].

smiley := Turtle new.
smiley eval: '

  to spiral :size :angle
    if :size < 100 [
      fd :size
      rt :angle
      spiral :size + 2 :angle
    ]
  end
  spiral 0 89

'

      
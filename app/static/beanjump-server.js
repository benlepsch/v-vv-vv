const _0x6100=['rank','connect','http://','domain','port','/beanjumpdata','enter\x20a\x20username\x20to\x20submit\x20with\x20ur\x20score:\x20(alphanumeric\x20characters\x20only,\x2012\x20character\x20limit)','match','alphanumeric\x20only\x20please','length','less\x20than\x2012\x20characters\x20please','number','fuck\x20you\x20penis','emit','new\x20score','get\x20scores','update','getElementById','highscores','style','display','block','hslist','createElement','appendChild','enter\x20the\x20username\x20to\x20search\x20for\x20(capitals\x20matter)','find\x20score','user\x20','\x20has\x20a\x20high\x20score\x20of\x20','highscore','\x20and\x20is\x20ranked\x20#'];(function(_0x3ff2b3,_0x530b2c){const _0x508a3c=function(_0x1a0fc9){while(--_0x1a0fc9){_0x3ff2b3['push'](_0x3ff2b3['shift']());}};_0x508a3c(++_0x530b2c);}(_0x6100,0x1b3));const _0x438a=function(_0x3ff2b3,_0x530b2c){_0x3ff2b3=_0x3ff2b3-0x0;let _0x508a3c=_0x6100[_0x3ff2b3];return _0x508a3c;};var socket=io[_0x438a('0x0')](_0x438a('0x1')+document[_0x438a('0x2')]+':'+location[_0x438a('0x3')]+_0x438a('0x4'));function submitScore(){let _0x4fb8c7=prompt(_0x438a('0x5'));while(!_0x4fb8c7[_0x438a('0x6')](/^[a-z0-9]+$/i)||_0x4fb8c7['length']>0xc){if(!_0x4fb8c7[_0x438a('0x6')](/^[a-z0-9]+$/i)){_0x4fb8c7=prompt(_0x438a('0x7'));continue;}if(_0x4fb8c7[_0x438a('0x8')]>0xc){_0x4fb8c7=prompt(_0x438a('0x9'));continue;}}if(typeof best_score!=_0x438a('0xa')){alert(_0x438a('0xb'));best_score=0x0;return;}socket[_0x438a('0xc')](_0x438a('0xd'),[_0x4fb8c7,best_score]);}function requestUpdatedScores(){socket[_0x438a('0xc')](_0x438a('0xe'),[]);}socket['on'](_0x438a('0xf'),_0x1d1ecc=>{let _0x44a97e=document[_0x438a('0x10')](_0x438a('0x11'));_0x44a97e[_0x438a('0x12')][_0x438a('0x13')]=_0x438a('0x14');let _0x4755c1=document[_0x438a('0x10')](_0x438a('0x15'));_0x4755c1['innerHTML']='';for(let _0x63b118=0x0;_0x63b118<_0x1d1ecc[_0x438a('0x8')];_0x63b118++){let _0x1e75c3=document[_0x438a('0x16')]('li');_0x1e75c3['innerHTML']=_0x1d1ecc[_0x63b118][0x0]+':\x20'+_0x1d1ecc[_0x63b118][0x1];_0x4755c1[_0x438a('0x17')](_0x1e75c3);}});function findRank(){let _0x3c3155=prompt(_0x438a('0x18'));socket[_0x438a('0xc')](_0x438a('0x19'),_0x3c3155);}socket['on']('found\x20score',_0x4c095b=>{alert(_0x438a('0x1a')+_0x4c095b['username']+_0x438a('0x1b')+_0x4c095b[_0x438a('0x1c')]+_0x438a('0x1d')+_0x4c095b[_0x438a('0x1e')]);});
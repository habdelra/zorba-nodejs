#include "functions.h"

#include <zorba/zorba.h>

using namespace std;
using namespace v8;
using namespace Nan;
using namespace node;

NAN_METHOD(execute) {
  String::Utf8Value cmd(info[0]);
  string sQuery = string(*cmd);

  void* store = zorba::StoreManager::getStore();
  zorba::Zorba* zorbaInstance  =  zorba::Zorba::getInstance(store);

  std::ostringstream lOutputStream;
  Zorba_CompilerHints_t hints;
  zorba::XQuery_t query = zorbaInstance->createQuery();
  Zorba_SerializerOptions lSerOptions;
  lSerOptions.omit_xml_declaration = ZORBA_OMIT_XML_DECLARATION_YES;

  try {
    query->compile(sQuery, hints);
    query->execute(lOutputStream, &lSerOptions);
  } catch (const std::exception& ex) {
    zorba::XQueryException& e = (zorba::XQueryException&)ex;
    std::cout << e << std::endl;
    std::ostringstream ss;
    ss << "{ \"type\": \"xquery\", ";

    ss << "\"file\": \"";
    ss << e.source_uri();
    ss << "\", ";

    ss << "\"lines\": \"";
    ss << e.source_line();
    if (e.source_line_end() > e.source_line()) {
      ss << '-';
      ss << e.source_line_end();
    }
    ss << "\", ";

    ss << "\"characters\": \"";
    ss << e.source_column();
    if (e.source_column_end() > e.source_column()) {
      ss << '-';
      ss << e.source_column_end();
    }
    ss << "\", ";

    ss << "\"error\": \"";
    std::string s;
    s = e.what();
    //s = s.remove( s.begin(), s.end(), '"');
    std::size_t found;
    std::string quote;
    quote = '"';
    found = s.find( quote );
    while (found!=std::string::npos){
      //s.replace(found, quote.size(), '"');
      s.erase(found, 1);
      found = s.find( quote );
    };
    ss << s;
    ss << "\" }";

    return Nan::ThrowError(Exception::Error(Nan::New<String>(ss.str().c_str()).ToLocalChecked()));
  }

  info.GetReturnValue().Set(Nan::New<String>(lOutputStream.str().c_str()).ToLocalChecked());
}

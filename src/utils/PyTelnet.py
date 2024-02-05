import telnetlib

class PyTelnet:
    def connect(self, url, port):
        try:
            self.tn = telnetlib.Telnet()
            self.tn.open(url, port, 20000)
        except Exception as e:
            print(f"Error trying to connect to: url={url} and port={port}. Error: {str(e)}")

    def Send(self, input):
        self.tn.write(input.encode("ascii")+ "\r\n")
    
    def read_until(self, text: str):
        output= self.tn.read_until(text.encode("ascii"),timeout=5).decode("utf-8")
        return True if output.find(text)>-1 else False
    
    def Close(self):
        self.tn.close()
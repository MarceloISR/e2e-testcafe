
import * as brython from 'brython';

// Initialize Brython
brython();

// Call the Python code
brython.py_import('__main__').then(() => {
    // Create an instance of PyTelnet
    const pyTelnet = new (window as any).PyTelnet();

    // Call the methods on PyTelnet
    pyTelnet.connect('url', 1234);
    pyTelnet.Send('input');
    const isTextFound = pyTelnet.read_until('text');
    pyTelnet.Close();

    console.log(isTextFound);
});




function sha256(str) {
  // Get the string as arraybuffer.
  var buffer = new TextEncoder("utf-8").encode(str)
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash)
  })
}

function hex(buffer) {
  var digest = ''
  var view = new DataView(buffer)
  for(var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i)
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16)
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }
  
  return digest
}


export async function registerUser(formData) {
    const username = formData.get('username')
    const email = formData.get('email')
    let password = formData.get('password')

    password = await sha256(password) 
    

    try {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:username, email:email, password:password }),
    });

    if (response.ok) {
        console.log('User registered successfully');
    } else {
        console.error('Error registering user', await response.text());
    }
    } catch (error) {
    console.error('Network or server error:', error);
    }
}

export async function loginUser(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
    });

    if (response.ok) {
        console.log('User logged in successfully');
    } else {
        console.error('Error logging user', await response.text());
    }
    } catch (error) {
        console.error('Network or server error:', error);
    }
}
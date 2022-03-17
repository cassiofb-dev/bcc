let cubeRotation = 0.0;

window.onload = () => main();

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  const VERTEX_SHADER_SOURCE = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  const FRAGMENT_SHADER_SOURCE = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  const shaderProgram = initShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    }
  };

  const buffers = initBuffers(gl);

  const texture = loadTexture(gl, 'data:image/png;base64,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');

  let then = 0;

  function render(now) {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const faceCords = (x, y) => [x, y, x - 1/2, y, x - 1/2, y + 1/3, x, y + 1/3];
  const textureCoordinates = [
    // Front
    ...faceCords(1/2, 0),

    // Back
    ...faceCords(1, 2/3),

    // Top
    ...faceCords(1, 1/3),

    // Bottom
    ...faceCords(1, 0),

    // Right
    ...faceCords(1/2, 2/3),

    // Left
    ...faceCords(1/2, 1/3),
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [
    0, 1, 2, 0, 2, 3,         // front
    4, 5, 6, 4, 6, 7,         // back
    8, 9, 10, 8, 10, 11,      // top
    12, 13, 14, 12, 14, 15,   // bottom
    16, 17, 18, 16, 18, 19,   // right
    20, 21, 22, 20, 22, 23,   // left
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);

  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  const image = new Image();

  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  }

  image.src = url;
  return texture;
}

function isPowerOf2(value) { return (value & (value - 1)) === 0; }

function drawScene(gl, programInfo, buffers, texture, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glMatrix.mat4.create();

  glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = glMatrix.mat4.create();

  glMatrix.mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 1.0, [0, 0, 1]);
  glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.7, [0, 1, 0]);
  glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.5, [1, 0, 0]);

  // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  cubeRotation += deltaTime;
}

function initShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
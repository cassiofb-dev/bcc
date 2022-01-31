import sys, ctypes
import sdl2, sdl2.ext
from OpenGL import GL
import opensimplex



def run():
    if sdl2.SDL_Init(sdl2.SDL_INIT_VIDEO) != 0:
        print(sdl2.SDL_GetError())
        return -1

    window = sdl2.SDL_CreateWindow(b"OpenGL Cylinder",
                                   sdl2.SDL_WINDOWPOS_UNDEFINED,
                                   sdl2.SDL_WINDOWPOS_UNDEFINED, 800, 600,
                                   sdl2.SDL_WINDOW_OPENGL)
    if not window:
        print(sdl2.SDL_GetError())
        return -1

    context = sdl2.SDL_GL_CreateContext(window)

    GL.glMatrixMode(GL.GL_PROJECTION | GL.GL_MODELVIEW)
    GL.glEnable(GL.GL_DEPTH_TEST)
    GL.glLoadIdentity()
    GL.glOrtho(-400, 400, -300, 300, -300, 300)

    draw(window)

    sdl2.SDL_GL_DeleteContext(context)
    sdl2.SDL_DestroyWindow(window)
    sdl2.SDL_Quit()
    return 0

def draw(window):
    mouse_x, mouse_y = ctypes.c_int(0), ctypes.c_int(0)
    position = 0

    while handle_events():
        position += 1
        black_background()
        sdl2.mouse.SDL_GetMouseState(ctypes.byref(mouse_x), ctypes.byref(mouse_y))
        mouse_rotation(mouse_x, mouse_y, lambda: draw_terrain(position))
        sdl2.SDL_GL_SwapWindow(window)
        sdl2.SDL_Delay(10)

def handle_events():
    for event in sdl2.ext.get_events():
        if event.type == sdl2.SDL_QUIT:
            return False
    return True

def black_background():
    GL.glClearColor(0, 0, 0, 1)
    GL.glClear(GL.GL_COLOR_BUFFER_BIT | GL.GL_DEPTH_BUFFER_BIT)

def mouse_rotation(mouse_x, mouse_y, draw_function):
        GL.glPushMatrix()
        angle_x = mouse_y.value / 600 * 360
        angle_y = - mouse_x.value / 800 * 360
        GL.glRotatef(angle_x, 1, 0, 0)
        GL.glRotatef(angle_y, 0, 1, 0)
        draw_function()
        GL.glPopMatrix()

def draw_terrain(z=0, width=800, height=400, scale=30, noise_height=200, noise_scale=0.1):
    columns = int(2 * width / scale)
    rows = int(2 * height / scale)

    GL.glBegin(GL.GL_TRIANGLE_STRIP)
    for i in range(columns - 1):
        for j in range(rows):
            noise_1 = opensimplex.noise2(i * noise_scale, (j + z) * noise_scale)
            noise_2 = opensimplex.noise2((i + 1) * noise_scale, (j + z) * noise_scale)
            GL.glColor3f(noise_1 / 2 + 1, noise_2 / 2 + 1, 0)
            GL.glVertex3f(i * scale - width / 2, noise_1 * noise_height, j * scale - height / 2)
            GL.glVertex3f((i + 1) * scale - width / 2, noise_2 * noise_height, j * scale - height / 2)
    GL.glEnd()


if __name__ == "__main__":
    sys.exit(run())
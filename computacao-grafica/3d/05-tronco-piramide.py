import sys, ctypes
import sdl2, sdl2.ext
from OpenGL import GL

def desenha_tronco_piramide():
    FRUSTUM_BOTTOM_BASE = [(200, 0, 0), (0, 200, 0), (-200, 0, 0), (0, -200, 0), (200, 0, 0)]
    FRUSTUM_TOP_BASE = [(100, 0, 100), (0, 100, 100), (-100, 0, 100), (0, -100, 100), (100, 0, 100)]
    GL.glBegin(GL.GL_QUADS)
    for point_index in range(4):
        GL.glColor3f(1, 0, 0)
        GL.glVertex3f(*FRUSTUM_BOTTOM_BASE[point_index])
        GL.glColor3f(0, 1, 0)
        GL.glVertex3f(*FRUSTUM_BOTTOM_BASE[point_index + 1])
        GL.glColor3f(0, 0, 1)
        GL.glVertex3f(*FRUSTUM_TOP_BASE[point_index + 1])
        GL.glColor3f(1, 0, 0)
        GL.glVertex3f(*FRUSTUM_TOP_BASE[point_index])
    GL.glColor3f(1, 1, 0)
    for point_index in range(4): GL.glVertex3f(*FRUSTUM_TOP_BASE[point_index])
    GL.glColor3f(0, 1, 1)
    for point_index in range(4): GL.glVertex3f(*FRUSTUM_BOTTOM_BASE[point_index])
    GL.glEnd()

def desenha_eixos():
    GL.glBegin(GL.GL_LINES)
    GL.glColor3f(1, 1, 1)
    GL.glVertex3f(0,0,0)
    GL.glVertex3f(400,0,0)
    GL.glVertex3f(0,0,0)
    GL.glVertex3f(0,400,0)
    GL.glEnd()

def run():
    if sdl2.SDL_Init(sdl2.SDL_INIT_VIDEO) != 0:
        print(sdl2.SDL_GetError())
        return -1

    window = sdl2.SDL_CreateWindow(b"OpenGL Frustum",
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

    mouse_x, mouse_y = ctypes.c_int(0), ctypes.c_int(0)
    event = sdl2.SDL_Event()
    running = True

    while running:
        for event in sdl2.ext.get_events():
            if event.type == sdl2.SDL_QUIT:
                running = False
        sdl2.mouse.SDL_GetMouseState(ctypes.byref(mouse_x), ctypes.byref(mouse_y))
        GL.glClearColor(0, 0, 0, 1)
        GL.glClear(GL.GL_COLOR_BUFFER_BIT | GL.GL_DEPTH_BUFFER_BIT)
        desenha_eixos()
        GL.glPushMatrix()
        angle_x = mouse_y.value / 600 * 360
        angle_y = - mouse_x.value / 800 * 360
        GL.glRotatef(angle_x, 1, 0, 0)
        GL.glRotatef(angle_y, 0, 1, 0)
        desenha_tronco_piramide()
        GL.glPopMatrix()

        sdl2.SDL_GL_SwapWindow(window)
        sdl2.SDL_Delay(10)
    sdl2.SDL_GL_DeleteContext(context)
    sdl2.SDL_DestroyWindow(window)
    sdl2.SDL_Quit()
    return 0

if __name__ == "__main__":
    sys.exit(run())

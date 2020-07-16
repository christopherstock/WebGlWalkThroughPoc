
    import * as bz      from '..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** ************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public start() : void
        {
            bz.Main.log( 'Init app' );

            const canvas        = document.createElement( 'canvas' );
            const canvasContext = canvas.getContext( 'webgl' );
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild( canvas );

            const engine = new BABYLON.Engine( canvasContext, true );
            const scene  = new BABYLON.Scene(engine);
            const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);




    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

    // // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;
    // sphere.scaling.scaleInPlace(100)

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
    const dome = new BABYLON.PhotoDome(
        'testdome',
        'res/image/skybox/market360.jpg',
        {
            resolution: 32,
            size: 1000,
        },
        scene
    );
    // We can't use dome.mesh.visibility, so we pick up the dome.mesh into a let sphere so we can use visibility
     const sphere = dome.mesh;
     const mat = new BABYLON.StandardMaterial('', scene)
     mat.disableLighting = true
     mat.emissiveTexture = new BABYLON.Texture('res/image/skybox/market360.jpg', scene, undefined, false)

     // mat.sideOrientation = 0
     sphere.material = mat

    scene.onBeforeRenderObservable.add(()=>{
        sphere.visibility -= 0.01
    })

    bz.Main.log( 'Completed init !' );




        }
    }

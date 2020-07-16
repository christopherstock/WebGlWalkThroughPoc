
    import * as bz      from '..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *
    *   TODO requires heavy refactoring!
    *******************************************************************************************************************/
    export class App
    {
        private static readonly     TRANSFER_SPEED :number = 0.025;
    
        private sphere1;
        private sphere2;

        private animate = false;

        private sprite1;
        private sprite2;
        private sprite3;
        private sprite4;
        private sprite5;
        private sprite6;

        /** ************************************************************************************************************
        *   Inits the app from scratch.
        ***************************************************************************************************************/
        public start() : void
        {
            bz.Main.log( 'Initializing app' );

            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('webgl');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            const engine = new BABYLON.Engine(canvasContext, true);
            const scene = new BABYLON.Scene(engine);


            const camera2 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 0), scene);
            camera2.setTarget(BABYLON.Vector3.Zero());
            camera2.attachControl(canvas, true);
/*
            const camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
            camera.inputs.attached.mousewheel.detachControl(canvas);
*/
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
            const ground = BABYLON.Mesh.CreateGround(
                'ground1',
                1,
                1,
                1,
                scene
            );


            const spriteManager = new BABYLON.SpriteManager(
                "treesManager",
                "res/image/sprite/infoIcon.png",
                10,
                150,
                scene
            );
            spriteManager.isPickable = true;

            this.sprite1 = new BABYLON.Sprite("sprite1", spriteManager);
            this.sprite1.position = new BABYLON.Vector3( 0.0, 10.0, 10.0 );
            this.sprite1.isPickable = true;
            this.sprite2 = new BABYLON.Sprite("sprite2", spriteManager);
            this.sprite2.position = new BABYLON.Vector3( 10.0, 0.0, -10.0 );
            this.sprite2.isPickable = true;
            this.sprite3 = new BABYLON.Sprite("sprite3", spriteManager);
            this.sprite3.position = new BABYLON.Vector3( 0.0, -10.0, 10.0 );
            this.sprite3.isPickable = true;
            this.sprite4 = new BABYLON.Sprite("sprite4", spriteManager);
            this.sprite4.position = new BABYLON.Vector3( -10.0, 10.0, 0.0 );
            this.sprite4.isPickable = true;
            this.sprite5 = new BABYLON.Sprite("sprite5", spriteManager);
            this.sprite5.position = new BABYLON.Vector3( -10.0, -10.0, 0.0 );
            this.sprite5.isPickable = true;
            this.sprite6 = new BABYLON.Sprite("sprite6", spriteManager);
            this.sprite6.position = new BABYLON.Vector3( 10.0, 0.0, 10.0 );
            this.sprite6.isPickable = true;

this.sprite1.actionManager = new BABYLON.ActionManager(scene);
this.sprite1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));
this.sprite2.actionManager = new BABYLON.ActionManager(scene);
this.sprite2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));
this.sprite3.actionManager = new BABYLON.ActionManager(scene);
this.sprite3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));
this.sprite4.actionManager = new BABYLON.ActionManager(scene);
this.sprite4.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite4.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));
this.sprite5.actionManager = new BABYLON.ActionManager(scene);
this.sprite5.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite5.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));
this.sprite6.actionManager = new BABYLON.ActionManager(scene);
this.sprite6.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){}));
this.sprite6.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){}));

            const dome1 = new BABYLON.PhotoDome(
                'testdome1',
                'res/image/skybox/market360.jpg',
                {
                    resolution: 32,
                    size: 1000,
                },
                scene
            );
            dome1.mesh.isPickable = false;
            const dome2 = new BABYLON.PhotoDome(
                'testdome2',
                'res/image/skybox/diningRoom360.jpg',
                {
                    resolution: 32,
                    size: 1000,
                },
                scene
            );
            dome2.mesh.isPickable = false;

            // We can't use dome.mesh.visibility,
            // so we pick up the dome.mesh into a let sphere
            // so we can use visibility
            this.sphere1 = dome1.mesh;
            const mat1 = new BABYLON.StandardMaterial('', scene)
            mat1.disableLighting = true
            mat1.emissiveTexture = new BABYLON.Texture('res/image/skybox/market360.jpg', scene, undefined, false)
            // mat1.sideOrientation = 0
            this.sphere1.material = mat1;
            this.sphere1.visibility = 1.0;

            this.sphere2 = dome2.mesh;
            const mat2 = new BABYLON.StandardMaterial('', scene)
            mat2.disableLighting = true
            mat2.emissiveTexture = new BABYLON.Texture('res/image/skybox/diningRoom360.jpg', scene, undefined, false)
            // mat1.sideOrientation = 0
            this.sphere2.material = mat2
            this.sphere2.visibility = 0.0;
/*
            scene.onPointerDown = ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) :void => {
                bz.Main.log( pickResult );

                if (
                    pickResult.pickedSprite === this.sprite1
                    || pickResult.pickedSprite === this.sprite2
                    || pickResult.pickedSprite === this.sprite3
                    || pickResult.pickedSprite === this.sprite4
                    || pickResult.pickedSprite === this.sprite5
                    || pickResult.pickedSprite === this.sprite6
                ) {
                    bz.Main.log( 'YES !' );

                }
            };
*/
    scene.onPointerDown = (evt) => {
        const pickResult = scene.pickSprite(evt.x, evt.y, function (sprite) {return sprite.isPickable; });
        if (pickResult.hit) {
            console.log("Sprite pick");
            this.animate = !this.animate;
        }
    };


            // Register a render loop to repeatedly render the scene
            engine.runRenderLoop(() => {
                this.onRun();
                scene.render();
            });

            // Watch for browser/canvas resize events
            window.addEventListener('resize', () => {

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                engine.resize();
            });
        }

        /** ************************************************************************************************************
        *   Being invoked once per render cycle.
        ***************************************************************************************************************/
        private onRun() : void
        {
            if ( this.animate )
            {
                if ( this.sphere1.visibility > 0 ) this.sphere1.visibility -= App.TRANSFER_SPEED;
                if ( this.sphere2.visibility < 1 ) this.sphere2.visibility += App.TRANSFER_SPEED;
            }
            else
            {
                if ( this.sphere1.visibility < 1 ) this.sphere1.visibility += App.TRANSFER_SPEED;
                if ( this.sphere2.visibility > 0 ) this.sphere2.visibility -= App.TRANSFER_SPEED;
            }
        }
    }

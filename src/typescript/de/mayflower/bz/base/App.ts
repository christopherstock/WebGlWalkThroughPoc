
    import * as bz      from '..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *
    *   TODO requires heavy refactoring!
    *******************************************************************************************************************/
    export class App
    {
        private static readonly     ANIMATION_TICKS :number = 100;

        private sphere1 :BABYLON.Mesh;
        private sphere2 :BABYLON.Mesh;

        private animate = false;
        private animateTick = 0;

        private sprite1;
        private sprite2;
        private sprite3;
        private sprite4;
        private sprite5;
        private sprite6;

        private dome1 :BABYLON.PhotoDome;
        private dome2 :BABYLON.PhotoDome;

        private mat1 :BABYLON.StandardMaterial;
        private mat2 :BABYLON.StandardMaterial;

        private tex1 :BABYLON.Texture;
        private tex2 :BABYLON.Texture;

        /** ************************************************************************************************************
        *   Inits the app from scratch.
        ***************************************************************************************************************/
        public start() : void
        {
            bz.Main.log('Initializing app');

            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('webgl');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            const engine = new BABYLON.Engine(canvasContext, true);
            engine.loadingUIBackgroundColor = "#ffffff";
            engine.displayLoadingUI();

            const scene = new BABYLON.Scene(engine);
/*
            // free camera works good on desktop
            const camera2 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 0), scene);
            camera2.setTarget(BABYLON.Vector3.Zero());
            camera2.attachControl(canvas, true);
*/
            const camera = new BABYLON.ArcRotateCamera(
                'Camera2',
                -Math.PI / 2,
                Math.PI / 2,
                10,
                BABYLON.Vector3.Zero(),
                scene
            );
            camera.position = BABYLON.Vector3.Zero();
            camera.attachControl(canvas, true);
            camera.inputs.attached.mousewheel.detachControl(canvas);

            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
/*
            const ground = BABYLON.Mesh.CreateGround(
                'ground1',
                1,
                1,
                1,
                scene
            );
*/
            const spriteManager = new BABYLON.SpriteManager(
                'treesManager',
                'res/image/sprite/infoIcon.png',
                10,
                150,
                scene
            );
            spriteManager.isPickable = true;

            this.sprite1 = new BABYLON.Sprite('sprite1', spriteManager);
            this.sprite1.position = new BABYLON.Vector3(0.0, 10.0, 10.0);
            this.sprite1.isPickable = true;
            this.sprite2 = new BABYLON.Sprite('sprite2', spriteManager);
            this.sprite2.position = new BABYLON.Vector3(10.0, 0.0, -10.0);
            this.sprite2.isPickable = true;
            this.sprite3 = new BABYLON.Sprite('sprite3', spriteManager);
            this.sprite3.position = new BABYLON.Vector3(0.0, -10.0, 10.0);
            this.sprite3.isPickable = true;
            this.sprite4 = new BABYLON.Sprite('sprite4', spriteManager);
            this.sprite4.position = new BABYLON.Vector3(-10.0, 10.0, 0.0);
            this.sprite4.isPickable = true;
            this.sprite5 = new BABYLON.Sprite('sprite5', spriteManager);
            this.sprite5.position = new BABYLON.Vector3(-10.0, -10.0, 0.0);
            this.sprite5.isPickable = true;
            this.sprite6 = new BABYLON.Sprite('sprite6', spriteManager);
            this.sprite6.position = new BABYLON.Vector3(10.0, 0.0, 10.0);
            this.sprite6.isPickable = true;

            this.sprite1.actionManager = new BABYLON.ActionManager(scene);
            this.sprite1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));
            this.sprite2.actionManager = new BABYLON.ActionManager(scene);
            this.sprite2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));
            this.sprite3.actionManager = new BABYLON.ActionManager(scene);
            this.sprite3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));
            this.sprite4.actionManager = new BABYLON.ActionManager(scene);
            this.sprite4.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite4.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));
            this.sprite5.actionManager = new BABYLON.ActionManager(scene);
            this.sprite5.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite5.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));
            this.sprite6.actionManager = new BABYLON.ActionManager(scene);
            this.sprite6.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            }));
            this.sprite6.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            }));

            this.dome1 = new BABYLON.PhotoDome(
                'testdome1',
                'res/image/skybox/market360.jpg',
                {
                    resolution: 32,
                    size: 1000,
                },
                scene
            );
            this.dome1.mesh.isPickable = false;
            this.dome2 = new BABYLON.PhotoDome(
                'testdome2',
                'res/image/skybox/diningRoom360.jpg',
                {
                    resolution: 32,
                    size: 1000,
                },
                scene
            );
            this.dome2.mesh.isPickable = false;

            // We can't use dome.mesh.visibility, so we pick up the dome.mesh into a Sphere so we can use visibility
            this.sphere1 = this.dome1.mesh;
            this.mat1 = new BABYLON.StandardMaterial('', scene);
            this.mat1.disableLighting = true;
            this.mat1.emissiveTexture = new BABYLON.Texture('res/image/skybox/market360.jpg', scene, undefined, false)
            this.tex1 = this.mat1.emissiveTexture as BABYLON.Texture;
            this.sphere1.material = this.mat1;
            this.sphere1.visibility = 1.0;

            this.sphere2 = this.dome2.mesh;
            this.mat2 = new BABYLON.StandardMaterial('', scene)
            this.mat2.disableLighting = true
            this.mat2.emissiveTexture = new BABYLON.Texture('res/image/skybox/diningRoom360.jpg', scene, undefined, false)
            this.tex2 = this.mat2.emissiveTexture as BABYLON.Texture;
            this.sphere2.material = this.mat2;
            this.sphere2.visibility = 0.0;

            scene.onPointerDown = (evt) => {
                const pickResult = scene.pickSprite(evt.x, evt.y, (sprite) => {
                    return sprite.isPickable;
                });
                if (pickResult.hit) {
                    console.log('Sprite pick');
                    this.toggleAnimation();
                }
            };

            window.addEventListener('resize', () => {

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                engine.resize();
            });

            scene.executeWhenReady(
                () :void => {

                    engine.hideLoadingUI();

                   engine.runRenderLoop(() => {
                        this.onRun();
                        scene.render();
                    });
                }
            );
        }

        /** ************************************************************************************************************
        *   Being invoked once per render cycle.
        ***************************************************************************************************************/
        private toggleAnimation() : void
        {
            if ( this.animateTick === 0 )
            {
                this.animateTick = App.ANIMATION_TICKS;

                this.animate = !this.animate;

                if ( this.animate )
                {
                    this.sphere1.visibility = 1.0;
                    this.sphere2.visibility = 0.0;
                }
                else
                {
                    this.sphere1.visibility = 0.0;
                    this.sphere2.visibility = 1.0;
                }

                this.tex1.uScale  = 1.0;
                this.tex1.uOffset = 1.0;
                this.tex1.vScale  = 1.0;
                this.tex1.vOffset = 1.0;

                this.tex2.uScale  = 1.0;
                this.tex2.uOffset = 1.0;
                this.tex2.vScale  = 1.0;
                this.tex2.vOffset = 1.0;
            }
        }

        /** ************************************************************************************************************
        *   Being invoked once per render cycle.
        ***************************************************************************************************************/
        private onRun() : void
        {
            if ( this.animateTick > 0 )
            {
                --this.animateTick;

                if ( this.animate )
                {
                    this.sphere1.visibility =       ( this.animateTick / App.ANIMATION_TICKS );
                    this.sphere2.visibility = 1.0 - ( this.animateTick / App.ANIMATION_TICKS );

                    this.tex2.vScale  = 1.0 + ( this.animateTick / App.ANIMATION_TICKS );
                    this.tex2.vOffset = 1.0 + ( this.animateTick / App.ANIMATION_TICKS * 200 );

                    this.tex1.vScale  -= 0.01;
                    this.tex1.vOffset -= 0.0005;
                }
                else
                {
                    this.sphere1.visibility = 1.0 - ( this.animateTick / App.ANIMATION_TICKS );
                    this.sphere2.visibility =       ( this.animateTick / App.ANIMATION_TICKS );

                    this.tex1.vScale  = 1.0 + ( this.animateTick / App.ANIMATION_TICKS );
                    this.tex1.vOffset = 1.0 + ( this.animateTick / App.ANIMATION_TICKS * 200 );

                    this.tex2.vScale  -= 0.01;
                    this.tex2.vOffset -= 0.0005;
                }
            }
        }
    }

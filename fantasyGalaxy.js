import {defs, tiny} from './examples/common.js';
import {Shape_From_File} from './examples/obj-file-demo.js';
import { Text_Line } from './text.js';


const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Cube, Textured_Phong, Axis_Arrows} = defs;

export class fantasyGalaxy extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.startSystem = false;
        this.initialCamera = 0;
        this.ride = false;
        this.shift = false;

        this.sunview = false;
        this.p1view = false;
        this.p2view = false;
        this.p3view = false;
        this.p4view = false;
        this.p5view = false;
        this.p6view = false;
        this.p7view = false;

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            // TODO:  Fill in as many additional shape instances as needed in this key/value table.
            //        (Requirement 1)
            box: new Cube(),
            text: new Text_Line(35),
            sphere: new defs.Subdivision_Sphere(4), //sun
            orangeOasis: new ( defs.Subdivision_Sphere.prototype.make_flat_shaded_version() )(2),   
            // popsicle: new defs.Subdivision_Sphere(3),
            popsicle: new ( defs.Subdivision_Sphere.prototype.make_flat_shaded_version() )(2),
            wildfire: new ( defs.Subdivision_Sphere.prototype.make_flat_shaded_version() )(2),
            torus:  new defs.Torus(25, 25),
            redVelvet: new defs. Subdivision_Sphere(1),
            minecraft: new defs.Cube(),
            chess: new defs.Subdivision_Sphere(6),
            panda: new defs.Subdivision_Sphere(5),
            starship: new Shape_From_File("assets/starship.obj"),
            head: new Shape_From_File("assets/male_head.obj"),
            pandaAlien: new Shape_From_File("assets/panda.obj"),
            pawn: new Shape_From_File("assets/pawn.obj"),
            minecraftAlien: new Shape_From_File("assets/minecraft-alien.obj"),
            orangeBird: new Shape_From_File("assets/orangebird.obj"),
            watermelon: new Shape_From_File("assets/watermelon.obj"),
            sword: new Shape_From_File("assets/sword.obj"),
            dragon: new Shape_From_File("assets/dragon.obj")
        }

        // *** Materials
        this.materials = {
            dragon: new Material(new defs.Phong_Shader(),
                {ambient: 0.55, diffusivity: 0.6, color: hex_color("#90ee90")}),
            sword: new Material(new defs.Phong_Shader(),
                {ambient: 0.30, diffusivity: 0.6, color: hex_color("#a9a9a9")}),
            watermelon: new Material(new defs.Phong_Shader(),
                {ambient: 0.55, diffusivity: 0.6, color: hex_color("#ff6666")}),
            text_image: new Material(new Textured_Phong(1), {
                color: hex_color("#6532a8"),
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/text.png"),
            }),
            start_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/start-background.png"),
            }),
            gouraud: new Material(new Gouraud_Shader(),
                {ambient: 0, diffusivity: .1, specularity: 1, color: hex_color("#992828")}),
            sun: new Material(new Texture_Scroll_X(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/sun-texture.png"),
            }),
            planet: new Material(new defs.Phong_Shader(),
                {ambient: 0, color: color(1,1,1,1) }),
            ring: new Material(new Ring_Shader(),
                {ambient: 0, specularity: 1, diffusivity: 1, color: color(0.05, 0.8, 0.55, 1) }),
            planet_ring: new Material(new Ring_Shader2(),
                {ambient: 0, specularity: 1, diffusivity: 1, color: color(0.05, 0.8, 0.55, 1) }),
            background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/starry-sky.png", "NEAREST"),
            }),
            chess_board: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/chess2.png"),
            }),
            panda: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/panda.png"),
            }),
            minecraft: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/minecraft.png"),
            }),
            frost: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/frost.png"),
            }),
            red_velvet: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/red-velvet.png"),
            }),
            starship: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.7, diffusivity: 0.7, specularity: 0.7,
                texture: new Texture("assets/ship-texture.jpeg"),
            }),
            head: new Material(new defs.Phong_Shader(),
                {ambient: 0.55, diffusivity: 0.6, color: hex_color("#f1c27d")}),

            orangeBird: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.7, diffusivity: 0.7, specularity: 0.7,
                texture: new Texture("assets/orange-bird-texture.jpeg"),
            }),
            pandaAlien: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.45, diffusivity: 0.5, specularity: 0.5,
                texture: new Texture("assets/background.png"),
            }),
            pawn: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.7, diffusivity: 0.7, specularity: 0.7,
                texture: new Texture("assets/wood.jpeg"),
            }),
            minecraftAlien: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.7, diffusivity: 0.7, specularity: 0.7,
                texture: new Texture("assets/creeper-skin.png"),
            }),

            sun_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/sun-background.png"),
            }),
            sun_desc: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/sun-desc.png"),
            }),
            p1_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p1-background.png"),
            }),
            p1_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p1-desc1.png"),
            }),
            p1_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p1-desc2.png"),
            }),
            p2_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p2-background.png"),
            }),
            p2_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p2-desc1.png"),
            }),
            p2_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p2-desc2.png"),
            }),
            p3_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p3-background.png"),
            }),
            p3_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p3-desc1.png"),
            }),
            p3_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p3-desc2.png"),
            }),
            p4_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p4-background.png"),
            }),
            p4_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p4-desc1.png"),
            }),
            p4_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p4-desc2.png"),
            }),
            p5_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p5-background.png"),
            }),
            p5_desc: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p5-desc.png"),
            }),
            p6_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p6-background.png"),
            }),
            p6_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p6-desc1.png"),
            }),
            p6_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p6-desc2.png"),
            }),
            p7_background: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p7-background.png"),
            }),
            p7_desc1: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p7-desc1.png"),
            }),
            p7_desc2: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 0.1, specularity: 0.1,
                texture: new Texture("assets/p7-desc2.png"),
            }),
        }

        this.initial_camera_location = Mat4.look_at(vec3(0, 40, 1), vec3(0, 0, 0), vec3(0, 1, 0));
        this.lights = [ new Light( new Vector( 5,-10,5,1 ), color( 0, 1, 1, 1 ), 1000 ) ];
        this.starship_model_transform =  Mat4.identity().times(Mat4.translation(-30, 0, 20));
    }

    //attached = () => "system";

    make_control_panel() {
        this.control_panel.innerHTML += "Fantasy Galaxy Controls: "
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Enter the galaxy", ["Enter"], () => {
            this.startSystem = true;
            if(this.initialCamera === 0) {
                this.initialCamera = 1;
            }
        });

        this.key_triggered_button("View solar system", ["q"], () => {
            this.attached = () => "system";
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Ride starship", ["r"], () => {
            this.ride = true;
            this.shift = true;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        })
        this.key_triggered_button("Hypercube", ["Control", "0"], () => {
            this.ride = false;
            this.sunview = true;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Orange Oasis", ["Control", "1"], () => {
            // this.attached = () => this.planet_1
            this.ride = false;
            this.sunview = false;
            this.p1view = true;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Popsicle", ["Control", "2"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = true;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Wildfire", ["Control", "3"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = true;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Red Velvet", ["Control", "4"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = true;
            this.p5view = false;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Minecraft", ["Control", "5"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = true;
            this.p6view = false;
            this.p7view = false;
        });
        this.key_triggered_button("Chess", ["Control", "6"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = true;
            this.p7view = false;
        });
        this.key_triggered_button("Panda", ["Control", "7"], () => {
            this.ride = false;
            this.sunview = false;
            this.p1view = false;
            this.p2view = false;
            this.p3view = false;
            this.p4view = false;
            this.p5view = false;
            this.p6view = false;
            this.p7view = true;
        });

        /*

        this.key_triggered_button("View solar system", ["Control", "0"], () => this.attached = () => this.initial_camera_location);
        this.key_triggered_button("Destination: Orange Oasis", ["Control", "1"], () => this.attached = () => this.planet_1);
        this.key_triggered_button("Destination: Popsicle", ["Control", "2"], () => this.attached = () => this.planet_2);
        this.key_triggered_button("Destination: Wildfire", ["Control", "3"], () => this.attached = () => this.planet_3);
        this.key_triggered_button("Destination: Red Velvet", ["Control", "4"], () => this.attached = () => this.planet_4);
        this.key_triggered_button("Destination: Minecraft", ["Control", "5"], () => this.attached = () => this.planet_5);
        this.key_triggered_button("Destination: Chess", ["Control", "6"], () => this.attached = () => this.planet_6);
        this.key_triggered_button("Destination: Panda", ["Control", "7"], () => this.attached = () => this.planet_7);

         */
        /*
        this.key_triggered_button("Move Starship Forward", ["Control", "w"], () => {
            this.starship_model_transform = this.starship_model_transform.times(Mat4.translation(0.3,0,0));
        });
        this.key_triggered_button("Move Starship Backwards", ["Control", "s"], () => {
            this.starship_model_transform = this.starship_model_transform.times(Mat4.translation(-0.3,0,0));
        });
        this.key_triggered_button("Move Starship Right", ["Control", "d"], () => {
            this.starship_model_transform = this.starship_model_transform.times(Mat4.rotation(0.3,0,1,0));
            this.starship_model_transform = this.starship_model_transform.times(Mat4.translation(0,0,0.3));           
        });
        this.key_triggered_button("Move Starship Left", ["Control", "a"], () => {
            this.starship_model_transform = this.starship_model_transform.times(Mat4.rotation(-0.3,0,1,0));
            this.starship_model_transform = this.starship_model_transform.times(Mat4.translation(0,0,-0.3));
        });
         */
    }

    // For Collision Detection: Distance calculation between objects
    getDistance(x1, y1, z1, x2, y2, z2){
        let xDist = x2 - x1;
        let yDist = y2 - y1;
        let zDist = z2 - z1;

        let sq = Math.pow(xDist, 2) + Math.pow(yDist, 2) + Math.pow(zDist, 2);
        return Math.sqrt(sq);
    }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        if(!this.startSystem) {
            program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
            program_state.set_camera(Mat4.look_at( vec3( 0,0,4 ), vec3( 0,0,0 ), vec3( 0,1,0 ) ));
            let start_transform = Mat4.identity();
            start_transform = start_transform.times(Mat4.scale(3.0, 3.0, 0.5));
            this.shapes.box.draw(context, program_state, start_transform, this.materials.start_background);
            let strings = ['You have arrived at the gateway\n\n\t\t\t\tto our fantasy galaxy...\n\n\t\t\t\t\tPress Enter to begin!'];
            const multi_line_string = strings[0].split("\n");
            let cube_side = Mat4.rotation(0, 1, 0, 0);
            cube_side = cube_side.times(Mat4.rotation(0, 0, 1, 0));
            cube_side = cube_side.times(Mat4.translation(-1.1, -0.7, 0.9));
            for (let line of multi_line_string.slice(0, 30)) {
                this.shapes.text.set_string(line, context.context);
                this.shapes.text.draw(context, program_state, cube_side.times(Mat4.scale(.05, .05, .05)), this.materials.text_image);
                cube_side.post_multiply(Mat4.translation(0, -0.09, 0));
            }
        } else {
            if(this.sunview) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(6, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.sun_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2, 0, 3));
                desc_transform = desc_transform.times(Mat4.scale(2, 2, 0.5));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.sun_desc);
                let sunRad = 0.25*Math.sin(2.1 * t - (Math.PI / 2) )  + 2
                let sun_trans = Mat4.identity();
                sun_trans = sun_trans.times(Mat4.translation(-2.6, 0, 4));
                sun_trans = sun_trans.times(Mat4.rotation(0.40*t, 1, 1, 1));
                sun_trans = sun_trans.times(Mat4.scale(sunRad, sunRad, sunRad));
                sun_trans = sun_trans.times(Mat4.scale(0.35, 0.35, 0.35));
                this.shapes.box.draw(context, program_state, sun_trans, this.materials.sun);
            } else if(this.p1view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.5, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p1_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, 0.8, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.9, 1.9, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p1_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, -3.0, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.9, 1.9, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p1_desc2);
                let p1 = Mat4.identity();
                p1 = p1.times(Mat4.translation(-2.6, -0.5, 4));
                p1 = p1.times(Mat4.rotation(0.2 * t, 0, 1, 0));
                p1 = p1.times(Mat4.scale(1, 1, 1));
                this.shapes.orangeOasis.draw(context, program_state, p1, this.materials.planet.override({
                    color: hex_color("#FFA500"),
                    specularity: 1,
                    diffusivity: 1,
                    ambient: 0.8
                }));
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.25+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.2 * t, 0, 1, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.orangeBird.draw(context, program_state, prop, this.materials.orangeBird);

            } else if(this.p2view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.8, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p2_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, 1.22, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.65, 1.65, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p2_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, -2.04, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.65, 1.65, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p2_desc2);
                let p2 = Mat4.identity();
                p2 = p2.times(Mat4.translation(-2.6, -0.5, 4));
                p2 = p2.times(Mat4.rotation(0.2 * t, 0, 1, 0));
                p2 = p2.times(Mat4.scale(0.65, 0.65, 0.65));
                p2 = p2.times(Mat4.scale(1, 2, 1));
                this.shapes.popsicle.draw(context, program_state, p2, this.materials.frost);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.25+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.2 * t, 0, 1, 0));
                prop = prop.times(Mat4.rotation(Math.PI, 1, 0, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.watermelon.draw(context, program_state, prop, this.materials.watermelon);

            } else if(this.p3view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.8, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p3_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, 0.9, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.6, 1.6, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p3_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, -2.3, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.6, 1.6, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p3_desc2);
                let p3 = Mat4.identity();
                p3 = p3.times(Mat4.translation(-2.6, -0.5, 4));
                p3 = p3.times(Mat4.rotation(0.2 * t, 0, 1, 0));
                this.shapes.wildfire.draw(context, program_state, p3, this.materials.planet.override({
                    color: color(0.7, 1, 0.5, 1),
                    specularity: 1,
                    diffusivity: 1,
                    ambient: 0.5
                }));
                let ringos = p3.times(Mat4.scale(1.3, 1.3, 0.1))    //reduced z-axis scaling
                this.shapes.torus.draw(context, program_state, ringos, this.materials.planet_ring);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.54+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.2 * t, 0, 1, 0));
                //prop = prop.times(Mat4.rotation((Math.PI)/2, 1, 0, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.dragon.draw(context, program_state, prop, this.materials.dragon);
            } else if(this.p4view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.6, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p4_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, 0.3, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.9, 1.9, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p4_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(1.9, -3.5, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.9, 1.9, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p4_desc2);
                let p4 = Mat4.identity();
                p4 = p4.times(Mat4.translation(-2.6, -0.6, 4));
                p4 = p4.times(Mat4.rotation(0.4 * t, 0, 1, 0));
                p4 = p4.times(Mat4.scale(1, 1, 1));
                this.shapes.redVelvet.draw(context, program_state, p4, this.materials.red_velvet);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.14+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.2 * t, 0, 1, 0));
                prop = prop.times(Mat4.rotation((Math.PI)/2, 1, 0, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.sword.draw(context, program_state, prop, this.materials.sword);
            } else if(this.p5view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.8, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p5_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2.1, 0.05, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.9, 1.9, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p5_desc);
                let p5 = Mat4.identity();
                p5 = p5.times(Mat4.translation(-2.6, -0.5, 4));
                p5 = p5.times(Mat4.rotation(0.3 * t, 0, 1, 0));
                p5 = p5.times(Mat4.scale(0.8, 0.8, 0.8));
                this.shapes.minecraft.draw(context, program_state, p5, this.materials.minecraft);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.00+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.4 * t, 0, 1, 0));
                prop = prop.times(Mat4.scale(0.2, 0.2, 0.2));
                this.shapes.minecraftAlien.draw(context, program_state, prop, this.materials.minecraftAlien);
            } else if(this.p6view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.8, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p6_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2.1, 1.1, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.7, 1.7, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p6_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2.1, -2.3, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.7, 1.7, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p6_desc2);
                let p6 = Mat4.identity();
                p6 = p6.times(Mat4.translation(-2.6, -0.5, 4));
                p6 = p6.times(Mat4.rotation(0.3 * t, 0, 1, 0));
                p6 = p6.times(Mat4.scale(1, 1, 1));
                this.shapes.chess.draw(context, program_state, p6, this.materials.chess_board);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.65, 1.02+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.4 * t, 0, 1, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.pawn.draw(context, program_state, prop, this.materials.pawn);
            } else if(this.p7view) {
                program_state.lights = [new Light(vec4(0, 1, 1, 0), color(1, 1, 1, 1), 999999)];
                program_state.set_camera(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                let bg_transform = Mat4.identity();
                bg_transform = bg_transform.times(Mat4.translation(5.8, 0, 0));
                bg_transform = bg_transform.times(Mat4.scale(7.2, 4.5, 0.5));
                this.shapes.box.draw(context, program_state, bg_transform, this.materials.p7_background);
                let desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2.0, 1.2, 3));
                desc_transform = desc_transform.times(Mat4.scale(1.6, 1.6, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p7_desc1);
                desc_transform = Mat4.identity();
                desc_transform = desc_transform.times(Mat4.translation(2.0, -2.0, 3.1));
                desc_transform = desc_transform.times(Mat4.scale(1.6, 1.6, 0.01));
                this.shapes.box.draw(context, program_state, desc_transform, this.materials.p7_desc2);
                let p7 = Mat4.identity();
                p7 = p7.times(Mat4.translation(-2.6, -0.5, 4));
                p7 = p7.times(Mat4.rotation(0.3 * t, 0, 1, 0));
                p7 = p7.times(Mat4.scale(1, 1, 1));
                this.shapes.panda.draw(context, program_state, p7, this.materials.panda);
                let prop = Mat4.identity();
                prop = prop.times(Mat4.translation(-2.67, 1.25+0.41*Math.sin(2.5*t + Math.PI/2), 4));
                prop = prop.times(Mat4.rotation(-0.4 * t, 0, 1, 0));
                prop = prop.times(Mat4.scale(.2, .2, .2));
                this.shapes.pandaAlien.draw(context, program_state, prop, this.materials.pandaAlien);
            } else {

                if(this.initialCamera === 1) {
                    program_state.set_camera(this.initial_camera_location);
                    this.initialCamera = 2;
                }

                const light_position = vec4(0, 0, 0, 1);

                const yellow = hex_color("#fac91a");
                const red = hex_color("#FF0000");
                const orange = hex_color("#FFA500");
                const pink = hex_color("#FFB6C1");
                const dark_pink = hex_color("#75480");
                const blue = hex_color("#1F51FF");
                let model_transform = Mat4.identity();


                // Setup Sun
                let sun = Mat4.identity();
                let centerOfSun = sun;
                var sunRad = 0.25*Math.sin(2.1 * t - (Math.PI / 2) )  + 2
                var sunColorOne = 0.6 * Math.sin(2 * t - (Math.PI / 1.5)) + 0.5
                var sunColorTwo = -0.5 * Math.sin(2 * t - (Math.PI / 1.5)) + 0.5
                let sun_trans = sun.times(Mat4.rotation(0.40*t, 1, 1, 1));
                sun_trans = sun_trans.times(Mat4.scale(sunRad, sunRad, sunRad));

                //Sun light: White color
                program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 10**sunRad)];

                let background_transform = Mat4.identity();
                background_transform = background_transform.times(Mat4.scale(60, 60, 60));

                this.shapes.box.draw(context, program_state, background_transform, this.materials.background);
                this.shapes.box.draw(context, program_state, sun_trans, this.materials.sun);

                //Add Rings to the Sun:
                let sun_rings = sun.times(Mat4.scale(2, 2, 0))
                sun_rings = sun_rings.times(Mat4.rotation(1.5*t, 1.5 * t, 1.5*t, 0))
                sun_rings = sun_rings.times(Mat4.scale(sunRad, sunRad, sunRad))
                //this.shapes.torus.draw(context, program_state, sun_rings, this.materials.ring);


                //Planet 1: Orange Oasis
                let p1 = Mat4.identity();
                p1 = p1.times(Mat4.rotation(0.2 * t, 0, 1, 0))
                p1 = p1.times(Mat4.translation(5,0,0))
                p1 = p1.times(Mat4.rotation(0.2 * t, 0, 0.3*t, 0))
                p1 = p1.times(Mat4.scale(1, 1, 1))

                this.shapes.orangeOasis.draw(context, program_state, p1, this.materials.planet.override( {color: orange, specularity: 1, diffusivity: 1, ambient: 0.3} ))

                //Planet 2: Popsicle / CATCH ME IF YOU CAN
                let p2 = centerOfSun.times(Mat4.rotation(0.3 * t + 2, 0, 1, 0))     //Rotating slower than Planet1
                    .times(Mat4.translation(8,0,0))      //5+3=8
                    .times(Mat4.rotation(0.4 * t, 1, 1, 1))
                    .times(Mat4.scale(0.65, 0.65, 0.65))
                    .times(Mat4.scale(1, 2, 1))

                /*
                var gOnEven = (Math.floor(t) % 2 == 0)
                // Gouraud shading if t is an odd second, Maximum specularity, Low diffuse
                if(!gOnEven){   //Phong when even
                    this.shapes.popsicle.draw(context, program_state, p2, this.materials.gouraud.override( {color: pink, specularity: 1, diffusivity: 0.1} ))
                }
                else {      //Gouraud when odd
                    this.shapes.popsicle.draw(context, program_state, p2, this.materials.planet.override( {color: dark_pink, specularity: 1, diffusivity: 0.1} ))
                }
                 */
                this.shapes.popsicle.draw(context, program_state, p2, this.materials.frost);


                //Planet 3: Wildfire
                let p3 = centerOfSun.times(Mat4.rotation(0.1 * t + 4, 0, 1, 0))       //Rotating slower than Planet2
                    .times(Mat4.translation(10,0,0))      //5+3+3=11
                    .times(Mat4.rotation(0.1 * t, 0, 1, 1))
                    .times(Mat4.scale(1, 1, 1))

                //Max diffuse and max specularity for Planet 3:
                this.shapes.wildfire.draw(context, program_state, p3, this.materials.planet.override( {color: color(0.7, 1, 0.5, 1), specularity: 1, diffusivity: 1} ))

                let ringos = p3.times(Mat4.scale(2, 2, 0.1))    //reduced z-axis scaling
                this.shapes.torus.draw(context, program_state, ringos, this.materials.planet_ring);


                //Planet 4: Red Velvet
                let p4 = Mat4.identity();
                p4 = p4.times(Mat4.rotation(0.25 * t + 6, 0, 1, 0))
                p4 = p4.times(Mat4.translation(12,0,0))
                p4 = p4.times(Mat4.rotation(0.25 * t, 0, 1, 0))
                p4 = p4.times(Mat4.scale(1, 1, 1))

                this.shapes.redVelvet.draw(context, program_state, p4, this.materials.red_velvet);


                //Planet 5: Minecraft
                let p5 = Mat4.identity();
                p5 = p5.times(Mat4.rotation(0.11 * t + 8, 0, 1, 0))
                p5 = p5.times(Mat4.translation(14,0,0))
                p5 = p5.times(Mat4.rotation(0.11 * t, 0, 0.11*t, 0))
                p5 = p5.times(Mat4.scale(0.8, 0.8, 0.8))

                this.shapes.minecraft.draw(context, program_state, p5, this.materials.minecraft)


                //Planet 6: Chess World
                let p6 = Mat4.identity();
                p6 = p6.times(Mat4.rotation(0.1 * t + 10, 0, 1, 0))
                p6 = p6.times(Mat4.translation(16,0,0))
                p6 = p6.times(Mat4.rotation(0.1 * t, 0, 0.1*t, 0))
                p6 = p6.times(Mat4.scale(1, 1, 1))

                this.shapes.chess.draw(context, program_state, p6, this.materials.chess_board)

                //Planet 7: Panda
                let p7 = Mat4.identity();
                p7 = p7.times(Mat4.rotation(0.3 * t + 12, 0, 1, 0))
                p7 = p7.times(Mat4.translation(18,0,0))
                p7 = p7.times(Mat4.rotation(0.3 * t, 0, 1, 0))
                p7 = p7.times(Mat4.scale(1, 1, 1))

                this.shapes.panda.draw(context, program_state, p7, this.materials.panda)


                // Fill with the correct planet's model matrix

                this.initial_camera_location = Mat4.look_at( vec3( 0,40,1 ), vec3( 0,0,0 ), vec3( 0,1,0 ) );
                this.planet_1 = Mat4.inverse(p1.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_2 = Mat4.inverse(p2.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_3 = Mat4.inverse(p3.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_4 = Mat4.inverse(p4.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_5 = Mat4.inverse(p5.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_6 = Mat4.inverse(p6.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )
                this.planet_7 = Mat4.inverse(p7.times(Mat4.translation(0,0,5))).map( (x,i) => Vector.from( program_state.camera_inverse[i] ).mix( x, 0.1 ) )


                if(this.attached !== undefined) {
                    let desired = this.attached();
                    if(desired === "system") {
                        desired = this.initial_camera_location;
                    }
                    //desired = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, 0.1));
                    program_state.set_camera(desired);
                    this.attached = undefined;
                }

                /*
                // If we reach these else if statements, then attached() is defined by now.
                else if(this.attached() == this.initial_camera_location){
                    program_state.set_camera(this.initial_camera_location)

                }
                else if(this.attached() == this.planet_1){
                    program_state.set_camera(this.planet_1)
                }
                else if(this.attached() == this.planet_2){
                    program_state.set_camera(this.planet_2)
                }
                else if(this.attached() == this.planet_3){
                    program_state.set_camera(this.planet_3)
                }
                else if(this.attached() == this.planet_4){
                    program_state.set_camera(this.planet_4)
                }
                else if(this.attached() == this.planet_5){
                    program_state.set_camera(this.planet_5)
                }
                else if(this.attached() == this.planet_6){
                    program_state.set_camera(this.planet_6)
                }
                else if(this.attached() == this.planet_7){
                    program_state.set_camera(this.planet_7)
                }
                */


                // Collison Detection:
           
                // Starship Coordinates: 
                let starship_center = new Array(4);
                starship_center = this.starship_model_transform.transposed()[3];
                let star_x = starship_center[0];
                let star_y = starship_center[1];
                let star_z = starship_center[2];


                // Collision with the Sun:
                let sun_center = sun_trans.transposed()[3];
                let sun_x = sun_center[0];
                let sun_y = sun_center[1];
                let sun_z = sun_center[2];
                let sun_dist = Math.pow(sun_x - star_x, 2) + Math.pow((sun_y - star_y), 2) + Math.pow((sun_z - star_z), 2);
                let sun_real_dist = Math.sqrt(sun_dist);
                if(sun_real_dist < 4){
                    console.log("Collision with the sun!!");
                    this.ride = false;
                    this.sunview = true;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = false;
                    this.starship_model_transform = this.starship_model_transform.times(Mat4.translation(0, 0, 5));
                }

                // Collision with Planet 1
                let p1_center = p1.transposed()[3];
                let p1_x = p1_center[0];
                let p1_y = p1_center[1];
                let p1_z = p1_center[2];

                let p1_dist = Math.pow(p1_x - star_x, 2) + Math.pow((p1_y - star_y), 2) + Math.pow((p1_z - star_z), 2);
                let p1_real_dist = Math.sqrt(p1_dist);
                if(p1_real_dist < 2){
                    console.log("Collision with planet 1!!");
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = true;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = false;
                }

                // Collision with Planet 2
                let p2_center = p2.transposed()[3];
                let p2_x = p2_center[0];
                let p2_y = p2_center[1];
                let p2_z = p2_center[2];

                let p2_dist = Math.pow(p2_x - star_x, 2) + Math.pow((p2_y - star_y), 2) + Math.pow((p2_z - star_z), 2);
                let p2_real_dist = Math.sqrt(p2_dist);
                if(p2_real_dist < 2){
                    console.log("Collision with planet 2!!");
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = true;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = false;
                }

                // Collision with Planet 3
                let p3_center = p3.transposed()[3];
                let p3_x = p3_center[0];
                let p3_y = p3_center[1];
                let p3_z = p3_center[2];

                let p3_dist = Math.pow(p3_x - star_x, 2) + Math.pow((p3_y - star_y), 2) + Math.pow((p3_z - star_z), 2);
                let p3_real_dist = Math.sqrt(p3_dist);
                if(p3_real_dist < 2){
                    console.log("Collision with planet 3!!");
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = true;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = false;
                }

                // Collision with Planet 4
                let p4_center = p4.transposed()[3];
                let p4_x = p4_center[0];
                let p4_y = p4_center[1];
                let p4_z = p4_center[2];

                let p4_dist = Math.pow(p4_x - star_x, 2) + Math.pow((p4_y - star_y), 2) + Math.pow((p4_z - star_z), 2);
                let p4_real_dist = Math.sqrt(p4_dist);
                if(p4_real_dist < 2){
                    console.log("Collision with planet 4!!");
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = true;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = false;
                }

                // Collision with Planet 5
                let p5_center = p5.transposed()[3];
                let p5_x = p5_center[0];
                let p5_y = p5_center[1];
                let p5_z = p5_center[2];

                let p5_dist = Math.pow(p5_x - star_x, 2) + Math.pow((p5_y - star_y), 2) + Math.pow((p5_z - star_z), 2);
                let p5_real_dist = Math.sqrt(p5_dist);
                if(p5_real_dist < 2){
                    console.log("Collision with planet 5!!");
                    this.p5_collision = true;
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = true;
                    this.p6view = false;
                    this.p7view = false;
                }

                // Collision with Planet 6
                let p6_center = p6.transposed()[3];
                let p6_x = p6_center[0];
                let p6_y = p6_center[1];
                let p6_z = p6_center[2];

                let p6_dist = Math.pow(p6_x - star_x, 2) + Math.pow((p6_y - star_y), 2) + Math.pow((p6_z - star_z), 2);
                let p6_real_dist = Math.sqrt(p6_dist);
                if(p6_real_dist < 2){
                    console.log("Collision with planet 6!!");
                    this.p6_collision = true;
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = true;
                    this.p7view = false;
                }

                // Collision with Planet 7
                let p7_center = p7.transposed()[3];
                let p7_x = p7_center[0];
                let p7_y = p7_center[1];
                let p7_z = p7_center[2];

                let p7_dist = Math.pow(p7_x - star_x, 2) + Math.pow((p7_y - star_y), 2) + Math.pow((p7_z - star_z), 2);
                let p7_real_dist = Math.sqrt(p7_dist);
                if(p7_real_dist < 2){
                    console.log("Collision with planet 7!!");
                    this.ride = false;
                    this.sunview = false;
                    this.p1view = false;
                    this.p2view = false;
                    this.p3view = false;
                    this.p4view = false;
                    this.p5view = false;
                    this.p6view = false;
                    this.p7view = true;
                }


                if(this.ride) {
                    this.attached = undefined;
                    if(this.shift){
                        program_state.set_camera(Mat4.inverse(this.starship_model_transform.times(Mat4.translation(0, 1.3, 0).times(Mat4.rotation(-Math.PI / 2, 0, 1, 0).times(Mat4.translation(0, 0, 6.5))))));
                        this.shift = false;
                    }
                    this.shapes.starship.draw(context, program_state, this.starship_model_transform, this.materials.starship);
                    let head_transform = this.starship_model_transform;
                    head_transform = head_transform.times(Mat4.translation(0.0, 0.4, 0));
                    head_transform = head_transform.times(Mat4.scale(0.2, 0.2, 0.2));
                    head_transform = head_transform.times(Mat4.rotation(-Math.PI/2, 0, 1, 0));
                    head_transform = head_transform.times(Mat4.rotation(-Math.PI/2, 1, 0, 0));
                    this.shapes.head.draw(context, program_state, head_transform, this.materials.head);
                    this.starship_model_transform = program_state.camera_transform.times(Mat4.translation(0, 0, -6.5).times(Mat4.rotation(Math.PI/2, 0, 1, 0).times(Mat4.translation(0, -1.3, 0))));
                } else {
                    if(!context.scratchpad.controls) {
                        program_state.set_camera(this.initial_camera_location);
                    }
                }

            }


        }
    }
}

class Texture_Scroll_X extends Textured_Phong {
    fragment_glsl_code() {
        return this.shared_glsl_code() + `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;
            
            void main(){
                // Sample the texture image in the correct place:
                vec4 tex_color = texture2D( texture, vec2(f_tex_coord.x - mod(animation_time,8.)*2., f_tex_coord.y));
                if( tex_color.w < .01 ) discard;
                                                                         // Compute an initial (ambient) color:
                gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w ); 
                                                                         // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `;
    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template
    // TODO: Modify the glsl coder here to create a Gouraud Shader (Planet 2)

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        varying vec3 color; 
  
        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.
            
            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;
    
            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4(position, 1.0);
                // The final normal vector in screen space.
                N = normalize(mat3(model_transform) * normal / squared_scale);
                vertex_worldspace = (model_transform * vec4(position, 1.0)).xyz;
                color = phong_model_lights(normalize(N), vertex_worldspace);
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){
                // Compute an initial (ambient) color:
                gl_FragColor = vec4(shape_color.xyz * ambient, shape_color.w);
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += color;
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;
        
        void main(){
            gl_Position = projection_camera_model_transform * vec4(position, 1.0 );
            //gl_Position = projection_camera_model_transform * model_transform * vec4(position, 1.0);
            point_position = model_transform * vec4(position, 1.0);
            center = model_transform * vec4(0.0, 0.0, 0.0, 1.0);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        void main()
        {
            float d = distance(point_position, center);
            float v = (sin(d * 20.) + 1.) /2.;
            gl_FragColor = vec4(v, v, v, 1.) * vec4(1, 1, 1, 1);
             
        }`;
    }
}

class Ring_Shader2 extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;
        
        void main(){
            gl_Position = projection_camera_model_transform * vec4(position, 1.0 );
            //gl_Position = projection_camera_model_transform * model_transform * vec4(position, 1.0);
            point_position = model_transform * vec4(position, 1.0);
            center = model_transform * vec4(0.0, 0.0, 0.0, 2.0);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        void main()
        {
            float d = distance(point_position, center);
            float v = (sin(d * 20.) + 1.) /2.;
            gl_FragColor = vec4(v, v, v, 1.) * vec4(0.6, 1, 0.3, 1);
            //gl_FragColor = vec4(0.6, 1, 0.3, 1);

             
        }`;
    }
}


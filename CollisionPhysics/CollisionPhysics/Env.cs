namespace CollisionPhysics;

public class Env
{
    //width and depth is in metres
    public double Width { get; set; }
    public double Depth { get; set; }

    public List<EnvObject> EnvironmentObjects { get; set; }

    public Env(double width,double depth, List<EnvObject> environmentObjects)
    {
        this.Width = width;
        this.Depth = depth;
        this.EnvironmentObjects = environmentObjects;
    }
    // public static List<Env> CreateEnvs(List<FrameData> frameDataList)
    // {
    //     List<Env> envs = new List<Env>();
    //     
    //     for(int i = 0; i < frameDataList.Count; i++)
    //     {
    //         FrameData currentFrameData = frameDataList[i];
    //         List<EnvObject> envObjects = new List<EnvObject>();
    //
    //         // Assume some generic width, length, mass for all objects for this example
    //         double objectWidth = 1.0;
    //         double objectLength = 2.0;
    //         double objectMass = 1000.0;
    //         
    //         // Create Vehicle object
    //         double previousSpeed = i == 0 ? 0 : frameDataList[i - 1].FirstObjectSpeedX;
    //         double previousAcceleration = i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - previousSpeed) /
    //                                                    (currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds;
    //
    //         var vehicle = new Vehicle(
    //             objectWidth, 
    //             objectLength, 
    //             new Position(currentFrameData.FirstObjectDistanceX, currentFrameData.FirstObjectDistanceY, 0),
    //             objectMass,
    //             currentFrameData.FirstObjectSpeedX,
    //             // Calculating Acceleration
    //             i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - previousSpeed) /
    //                          (currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds,
    //             // Calculating Jerk
    //             i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - 2 * previousSpeed + (i < 2 ? 0 : frameDataList[i - 2].FirstObjectSpeedX)) /
    //                          Math.Pow((currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds, 2)
    //         );
    //
    //         
    //         envObjects.Add(vehicle);
    //
    //         // Similarly, you can create other EnvObjects and MovingObjects and add them to envObjects
    //         // You need to calculate absolute positions and other properties based on currentFrameData
    //         
    //         var env = new Env()
    //         {
    //             Width = 100, // Example value
    //             Depth = 100, // Example value
    //             EnvironmentObjects = envObjects
    //         };
    //         
    //         envs.Add(env);
    //     }
    //     
    //     return envs;
    // }

    public enum Scenario
    {
        CPNCO, // Child pedestrian not crossing or crossing, obstructed view
        CPTA,  // Car pedestrian turn across
        CPLA   // Car pedestrian lane adjacent
    }

    //Move Time along in our world
    public Env TickEnvironment(TimeSpan milliSeconds)
    {
        List<EnvObject> envObjects = new List<EnvObject>();
        Env e = new Env(this.Width, this.Depth, envObjects);

        foreach (var envObj in this.EnvironmentObjects)
        {
            if (envObj is MovingObject)
            {
                envObjects.Add((envObj as MovingObject).Move(milliSeconds));
            }
            else
            {
                envObjects.Add(envObj);
            }
        }
        return e;
    }
    //here we can generate scenarios based on a preset world, so we can test our systems
    public static Env CreateEnvironmentForScenario(Scenario scenario)
    {
        double width = 10;
        double depth = 100;
        List<EnvObject> envObjects = new List<EnvObject>();
        
        switch (scenario)
        {
            case Scenario.CPNCO:
                //cars coming in other lane
                envObjects.Add(new Vehicle(1.75,2.5,new Position(2.5,15,-180),1500,3,0,0));
                envObjects.Add(new Vehicle(1.75,2.5,new Position(2.5,20,-180),1500,4,0,0));
                
                //our car
                envObjects.Add(new Vehicle(1.75,2.5,new Position(5.5,67,0),1500,5.6923,0,0));
                
                //pedestrian/child
                envObjects.Add(new MovingObject(){Width = 0.3,Length = 0.3,Acceleration = 0,Jerk = 0,Mass = 30,Position = new Position(11,30,90), Type = EnvObjectType.Pedestrian});
                
                //parking cars
                envObjects.Add(new EnvObject(){Width = 1.75, Length = 2.5, Position = new Position(8,31,0)});
                envObjects.Add(new EnvObject(){Width = 1.75, Length = 2.5, Position = new Position(8,34,0)});
                
                break;
            case Scenario.CPTA:
                
                break;
            case Scenario.CPLA:
                
                break;
        }
        return new Env(width,depth,envObjects);
    }
}

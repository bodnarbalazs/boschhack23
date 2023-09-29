namespace CollisionPhysics;

public class Env
{
    //width and depth is in metres
    public double Width { get; set; }
    public double Depth { get; set; }

    public List<EnvObject> EnvironmentObjects { get; set; }
    
    public static List<Env> CreateEnvs(List<FrameData> frameDataList)
    {
        List<Env> envs = new List<Env>();
        
        for(int i = 0; i < frameDataList.Count; i++)
        {
            FrameData currentFrameData = frameDataList[i];
            List<EnvObject> envObjects = new List<EnvObject>();

            // Assume some generic width, length, mass for all objects for this example
            double objectWidth = 1.0;
            double objectLength = 2.0;
            double objectMass = 1000.0;
            
            // Create Vehicle object
            double previousSpeed = i == 0 ? 0 : frameDataList[i - 1].FirstObjectSpeedX;
            double previousAcceleration = i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - previousSpeed) /
                                                       (currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds;

            var vehicle = new Vehicle(
                objectWidth, 
                objectLength, 
                new Position(currentFrameData.FirstObjectDistanceX, currentFrameData.FirstObjectDistanceY, 0),
                objectMass,
                currentFrameData.FirstObjectSpeedX,
                // Calculating Acceleration
                i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - previousSpeed) /
                             (currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds,
                // Calculating Jerk
                i == 0 ? 0 : (currentFrameData.FirstObjectSpeedX - 2 * previousSpeed + (i < 2 ? 0 : frameDataList[i - 2].FirstObjectSpeedX)) /
                             Math.Pow((currentFrameData.Timestamp - frameDataList[i - 1].Timestamp).TotalMilliseconds, 2)
            );

            
            envObjects.Add(vehicle);

            // Similarly, you can create other EnvObjects and MovingObjects and add them to envObjects
            // You need to calculate absolute positions and other properties based on currentFrameData
            
            var env = new Env()
            {
                Width = 100, // Example value
                Depth = 100, // Example value
                EnvironmentObjects = envObjects
            };
            
            envs.Add(env);
        }
        
        return envs;
    }
}

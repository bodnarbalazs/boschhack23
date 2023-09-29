namespace CollisionPhysics;

public class PerspectiveEnv
{
    public double Width { get; set; }
    public double Depth { get; set; }

    //this should be converted to the perspective coordinate system
    public List<EnvObject> EnvironmentObjects { get; set; }
}
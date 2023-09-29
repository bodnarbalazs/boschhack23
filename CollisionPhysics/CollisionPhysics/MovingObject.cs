namespace CollisionPhysics;

public class MovingObject:EnvObject
{
    //speed is in m/s
    public double Speed { get; set; }
    public double Acceleration { get; set; }
    public double Jerk { get; set; }
}
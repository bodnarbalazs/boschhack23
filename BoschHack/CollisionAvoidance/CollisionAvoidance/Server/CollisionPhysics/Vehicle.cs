namespace CollisionPhysics;

public class Vehicle:MovingObject
{
    public double SteeringAngle { get; set; }
    //steering is about angles
    //also yaw
    public double MinSteeringAngle { get; set; }
    public double MaxSteeringAngle { get; set; }
    public double MaxSteeringDelta { get; set; }
    
    //Field of View, could be float, but we don't want the conversion fun
    public double FieldOfView { get; set; } = 120;
    public double BreakLatency { get; set; }
    public Vehicle(double width, double length,Position position, double mass, double speed, double acceleration, double jerk)
    {
        this.Width = width;
        this.Length = length;
        this.Position = position;
        this.Mass = mass;
        this.Speed = speed;
        this.Acceleration = acceleration;
        this.Jerk = jerk;
        this.BreakLatency = 0.2;
    }
}
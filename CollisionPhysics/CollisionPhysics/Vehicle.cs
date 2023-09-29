namespace CollisionPhysics;

public class Vehicle:MovingObject
{

    public Vehicle(double width, double length,Position position, double mass, double speed, double acceleration, double jerk)
    {
        this.Width = width;
        this.Length = length;
        this.Position = position;
        this.Mass = mass;
        this.Speed = speed;
        this.Acceleration = acceleration;
        this.Jerk = jerk;
    }
}
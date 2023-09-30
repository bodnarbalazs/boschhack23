namespace CollisionPhysics;

public class MovingObject:EnvObject
{
    //speed is in m/s
    public double Speed { get; set; }
    public double Acceleration { get; set; }
    public double Jerk { get; set; }

    public MovingObject Move(TimeSpan timeSpan)
    {
        // Convert timeSpan to seconds for the calculations
        double timeInSeconds = timeSpan.TotalSeconds;

        // Convert the rotation to radians for the calculations
        double rotInRadians = this.Position.Rotation * (Math.PI / 180.0);

        // Calculate the new X and Y based on the current speed, rotation, and time
        double newX = this.Position.X + this.Speed * Math.Cos(rotInRadians) * timeInSeconds;
        double newY = this.Position.Y + this.Speed * Math.Sin(rotInRadians) * timeInSeconds;
    
        // Create a new MovingObject with the updated position and the same properties
        MovingObject movedObject = new MovingObject()
        {
            Position = new Position(newX, newY, this.Position.Rotation),
            Speed = this.Speed,
            Acceleration = this.Acceleration,
            Jerk = this.Jerk,
            Width = this.Width,
            Length = this.Length,
            Mass = this.Mass
        };
    
        return movedObject;
    }

}
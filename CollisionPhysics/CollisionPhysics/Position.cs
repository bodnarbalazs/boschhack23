namespace CollisionPhysics;

public class Position
{
    public double X { get; set; }
    public double Y { get; set; }
    
    //rotation is degrees counter-clockwise starting from north/up
    public double Rotation { get; set; }

    public Position(double x, double y, double rot)
    {
        this.X = x;
        this.Y = y;
        this.Rotation = rot;
    }
    
    public void Rotate(double degrees)
    {
        this.Rotation = (Rotation + degrees) % 360;
    }
    
}
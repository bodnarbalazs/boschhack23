using System.Reflection.Metadata.Ecma335;

namespace CollisionPhysics;

public class EnvObject
{
    public double Width { get; set; }
    public double Length { get; set; }
    public Position Position { get; set; }
    public double Mass { get; set; }
    public EnvObjectType Type { get; set; }

    public double GetWidthFromEnvType()
    {
        switch (this.Type)
        {
            case EnvObjectType.OurCar: 
                return 1.5;
            case EnvObjectType.Car: 
                return 1.5;
            case EnvObjectType.Pedestrian: 
                return 1;
            case EnvObjectType.Cube: 
                return 1;
        }

        return 0;
    }
    public double GetHeightFromEnvType()
    {
        switch (this.Type)
        {
            case EnvObjectType.OurCar:
                return 2.5;
            case EnvObjectType.Car:
                return 2.5;
            case EnvObjectType.Pedestrian:
                return 1;
            case EnvObjectType.Cube:
                return 1;
        }

        return 0;
    }

}

public enum EnvObjectType
{
    OurCar,
    Car,
    Pedestrian,
    Cube
}
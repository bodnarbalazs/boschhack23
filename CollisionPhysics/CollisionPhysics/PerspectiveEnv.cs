namespace CollisionPhysics;

public class PerspectiveEnv
{
    public double Width { get; set; } = 10;
    public double Depth { get; set; } = 30;

    //this should be converted to the perspective coordinate system
    public List<EnvObject> EnvironmentObjects { get; set; }

    //here we create a new perspectiveEnvironment based on an env (environment instance)
    //we know that there is a special EnvObject there, our car so we can use the field of view
    public PerspectiveEnv(Env environment)
    {
        this.EnvironmentObjects = new List<EnvObject>();
    
        Vehicle ourCar = environment.EnvironmentObjects.OfType<Vehicle>().FirstOrDefault(o => o.Type == EnvObjectType.OurCar);

        if (ourCar == null) return;

        double halfWidth = Width / 2.0;
        double carX = halfWidth;
        double carY = Depth - 5;

        foreach (var obj in environment.EnvironmentObjects)
        {
            if (obj == ourCar) continue; // skip the car itself

            // Convert to relative coordinates
            double relX = obj.Position.X - ourCar.Position.X + halfWidth;
            double relY = carY - obj.Position.Y; // Because we're assuming origin is top-left

            double angle = Math.Atan2(relY, relX) * (180.0 / Math.PI);
            double distance = Math.Sqrt(relX * relX + relY * relY);

            // Filter by field of view and range
            if (Math.Abs(angle) <= ourCar.FieldOfView / 2.0 && distance <= this.Depth)
            {
                // Perform Raycasting
                bool isObscured = environment.EnvironmentObjects.Any(other =>
                {
                    if (other == obj || other == ourCar) return false;
                    
                    return IsObjectInLineOfSight(ourCar, other, obj);
                });

                if (!isObscured)
                {
                    // Convert to Perspective Coordinates and add to the list
                    obj.Position.X = relX;
                    obj.Position.Y = relY;
                    this.EnvironmentObjects.Add(obj);
                }
            }
        }
    }

    private bool IsObjectInLineOfSight(EnvObject source, EnvObject obstacle, EnvObject target)
    {
        // Line Segment between source and target
        double ax = source.Position.X;
        double ay = source.Position.Y;
        double bx = target.Position.X;
        double by = target.Position.Y;

        double halfWidth = obstacle.GetWidthFromEnvType() / 2.0;
        double halfHeight = obstacle.GetHeightFromEnvType() / 2.0;
    
        // Corners of the obstacle
        List<Position> corners = new List<Position>
        {
            new Position(obstacle.Position.X - halfWidth, obstacle.Position.Y - halfHeight, 0),
            new Position(obstacle.Position.X + halfWidth, obstacle.Position.Y - halfHeight, 0),
            new Position(obstacle.Position.X - halfWidth, obstacle.Position.Y + halfHeight, 0),
            new Position(obstacle.Position.X + halfWidth, obstacle.Position.Y + halfHeight, 0)
        };
    
        // Check whether any corner of the obstacle is between source and target
        foreach (var corner in corners)
        {
            double cx = corner.X;
            double cy = corner.Y;
        
            double crossproduct = (cy - ay) * (bx - ax) - (cx - ax) * (by - ay);
            if (Math.Abs(crossproduct) > 1e-10) continue; // not collinear
        
            double dotproduct = (cx - ax) * (bx - ax) + (cy - ay) * (by - ay);
            if (dotproduct < 0) continue; // beyond the point source
        
            double squaredlengthba = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
            if (dotproduct > squaredlengthba) continue; // beyond the point target
        
            return true; // obstacle is in the line of sight between source and target
        }

        return false;
    }


}
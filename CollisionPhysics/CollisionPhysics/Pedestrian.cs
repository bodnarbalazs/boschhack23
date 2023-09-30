using CollisionPhysics;

public enum LifeStage
{
    Child, 
    Adult, 
    Elderly
}

public class Pedestrian : MovingObject
{
    public LifeStage LifeStage { get; set; }

    public Pedestrian(double width, double length, Position position, double mass, double speed, double acceleration, double jerk, LifeStage lifeStage)
    {
        this.LifeStage = lifeStage;
    }

    public double CalculateCollisionDamage()
    {
        return 0.5 * this.Mass * Math.Pow(this.Speed, 2); // Kinetic Energy Formula
    }

    public double CalculateMortalityRate(double collisionMagnitude)
    {
        double lifeStageMultiplier;

        switch (this.LifeStage)
        {
            case LifeStage.Child:
                lifeStageMultiplier = 0.5;
                break;
            case LifeStage.Elderly:
                lifeStageMultiplier = 1.5;
                break;
            case LifeStage.Adult:
            default:
                lifeStageMultiplier = 1.0;
                break;
        }

        double mortalityRate = collisionMagnitude * lifeStageMultiplier;

        // Ensure mortality rate is within [0, 100]
        return Math.Min(Math.Max(mortalityRate, 0), 100);
    }
}
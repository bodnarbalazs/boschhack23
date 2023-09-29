namespace CollisionPhysics;

public class FrameData
{
    public double FirstObjectDistanceX { get; private set; }
    public double FirstObjectDistanceY { get; private set; }
    public double SecondObjectDistanceX { get; private set; }
    public double SecondObjectDistanceY { get; private set; }
    public double ThirdObjectDistanceX { get; private set; }
    public double ThirdObjectDistanceY { get; private set; }
    public double FourthObjectDistanceX { get; private set; }
    public double FourthObjectDistanceY { get; private set; }
    public double VehicleSpeed { get; private set; }
    public double FirstObjectSpeedX { get; private set; }
    public double FirstObjectSpeedY { get; private set; }
    public double SecondObjectSpeedX { get; private set; }
    public double SecondObjectSpeedY { get; private set; }
    public double ThirdObjectSpeedX { get; private set; }
    public double ThirdObjectSpeedY { get; private set; }
    public double FourthObjectSpeedX { get; private set; }
    public double FourthObjectSpeedY { get; private set; }
    public double YawRate { get; private set; }
    public DateTime Timestamp { get; private set; }

    public FrameData(double firstObjectDistanceX, double firstObjectDistanceY,
                 double secondObjectDistanceX, double secondObjectDistanceY,
                 double thirdObjectDistanceX, double thirdObjectDistanceY,
                 double fourthObjectDistanceX, double fourthObjectDistanceY,
                 double vehicleSpeed,
                 double firstObjectSpeedX, double firstObjectSpeedY,
                 double secondObjectSpeedX, double secondObjectSpeedY,
                 double thirdObjectSpeedX, double thirdObjectSpeedY,
                 double fourthObjectSpeedX, double fourthObjectSpeedY,
                 double yawRate, DateTime timestamp)
    {
        FirstObjectDistanceX = firstObjectDistanceX / 128;
        FirstObjectDistanceY = firstObjectDistanceY / 128;
        SecondObjectDistanceX = secondObjectDistanceX / 128;
        SecondObjectDistanceY = secondObjectDistanceY / 128;
        ThirdObjectDistanceX = thirdObjectDistanceX / 128;
        ThirdObjectDistanceY = thirdObjectDistanceY / 128;
        FourthObjectDistanceX = fourthObjectDistanceX / 128;
        FourthObjectDistanceY = fourthObjectDistanceY / 128;

        VehicleSpeed = vehicleSpeed;

        FirstObjectSpeedX = firstObjectSpeedX / 256;
        FirstObjectSpeedY = firstObjectSpeedY / 256;
        SecondObjectSpeedX = secondObjectSpeedX / 256;
        SecondObjectSpeedY = secondObjectSpeedY / 256;
        ThirdObjectSpeedX = thirdObjectSpeedX / 256;
        ThirdObjectSpeedY = thirdObjectSpeedY / 256;
        FourthObjectSpeedX = fourthObjectSpeedX / 256;
        FourthObjectSpeedY = fourthObjectSpeedY / 256;

        YawRate = yawRate;
        Timestamp = timestamp;
    }
}
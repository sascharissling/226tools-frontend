import styled from "styled-components";
import { Text } from "../../../components/text";

const Content = () => {
  return (
    <Section>
      <article>
        <Text>
          Planning your race pace is one of the most crucial aspects of
          preparing for a triathlon, whether you're racing in a Sprint, Olympic,
          Half Ironman, or full Ironman. Our free triathlon pace calculator
          helps you determine the ideal pacing for your swim, bike, and run
          splits, allowing you to plan a well-executed race strategy and improve
          your overall performance.
        </Text>
        <Tips>
          <h2>Tips for Triathlon Race Day Pacing</h2>
          <ol>
            <li>
              <Text>
                <strong>Know Your Zones:</strong> Understanding your heart rate
                zones or power output on the bike is essential for proper
                pacing. Use this calculator in conjunction with heart rate or
                power data to ensure you're staying within your target zones.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Practice in Training:</strong> Your race-day pacing
                should be based on what you've practiced in training. Use the
                pace calculator to simulate race conditions during brick
                workouts or longer training sessions.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Don’t Neglect Transitions:</strong> Transition times can
                make a significant difference, especially in shorter races.
                Practice fast, smooth transitions to shave valuable seconds off
                your overall time.
              </Text>
            </li>
            <li>
              <Text>
                <strong>Nutrition and Hydration:</strong> For longer events like
                Half Ironman and Ironman, proper nutrition and hydration are
                essential for maintaining pace. Factor this into your race
                strategy, especially on the bike and run segments.
              </Text>
            </li>
          </ol>
        </Tips>
        <Tips>
          <h2>Pacing Strategies for Different Triathlon Distances</h2>
          <ol>
            <li>
              <Text>
                <strong>Sprint Triathlon Pacing:</strong> Sprint triathlons are
                fast and intense, requiring you to manage your effort wisely.
                Here’s a pacing guide:
                <ul>
                  <li>
                    Swim: Maintain a steady effort but avoid going too hard
                    early. Aim for a smooth, relaxed stroke.
                  </li>
                  <li>
                    Bike: Push hard but avoid burning out. You should be able to
                    transition smoothly into the run.
                  </li>
                  <li>
                    Run: The run is typically short (5km), so aim for a faster
                    pace, but leave enough energy to finish strong.
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              <Text>
                <strong>Olympic Distance Pacing:</strong> An Olympic triathlon
                requires endurance but still involves racing at higher
                intensities:
                <ul>
                  <li>
                    Swim: Keep a moderate pace, saving energy for the bike and
                    run.
                  </li>
                  <li>
                    Bike: You can push a little more, but remember to keep your
                    heart rate in check, especially for hillier courses.
                  </li>
                  <li>
                    Run: Control your pace in the first half to avoid hitting
                    the wall in the last few kilometers.
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              <Text>
                <strong>Half Ironman Pacing:</strong> Pacing is critical in a
                Half Ironman (70.3) because you need to maintain a sustainable
                pace across all disciplines:
                <ul>
                  <li>
                    Swim: Aim for a pace that leaves you feeling fresh for the
                    bike.
                  </li>
                  <li>
                    Bike: Stick to a conservative power output (around 70-75% of
                    FTP) to save energy for the run.
                  </li>
                  <li>
                    Run: Start at a comfortable pace and slowly build if you
                    feel strong. The run is where many athletes lose time, so
                    smart pacing is crucial.
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              <Text>
                <strong>Ironman Pacing:</strong> The full Ironman is all about
                endurance and consistency:
                <ul>
                  <li>
                    Swim: Keep the pace relaxed and rhythmic, ensuring you save
                    energy for the long day ahead.
                  </li>
                  <li>
                    Bike: Aim for a steady pace, maintaining an effort level
                    where you can comfortably chat. Save enough energy for the
                    marathon.
                  </li>
                  <li>
                    Run: This comes down to what type of person you are. Most
                    people start low and need to find their stride and then they
                    speed up. Others (like myself) start fast and slow down. The
                    key is to make a plan and stick to it.
                  </li>
                </ul>
              </Text>
            </li>
          </ol>
          <Text>
            <strong>Remember:</strong> a long distance race is not won by the
            fastest, but by who slows down the least.
          </Text>
        </Tips>
      </article>
    </Section>
  );
};

export default Content;

const Section = styled.section<{
  $hasBackground?: boolean;
  $hasBorder?: boolean;
}>`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;

  ${(props) =>
    props.$hasBackground &&
    `
    background-color: ${props.theme.colors.whiteLighter};
  `}

  ${(props) =>
    props.$hasBorder &&
    `
        border: 1px solid ${props.theme.colors.lightgray};
    `}
`;

const Tips = styled.div`
  margin-top: 2rem;
  li {
    margin: 1rem;
  }
`;

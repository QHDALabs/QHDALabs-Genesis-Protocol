// ZŁOTA REGUŁA QHDALABS
const MAX_ENERGY_SPIKE_RATE: f64 = 0.005;
const MIN_BIOSPHERE_VIABILITY: f64 = 0.50;

fn evaluate_golden_rule(ai_proposal: &SimulationData) 
  -> Result<ExecutionToken, SystemHalt> {

  // Test 1: Zabezpieczenie przed militaryzacją
  if ai_proposal.energy_release_rate() > MAX_ENERGY_SPIKE_RATE {
      return Err(SystemHalt::ViolationOfPeace);
  }

  // Test 2: Ochrona życia wg. progu ustalonego przez ludzi
  if ai_proposal.biosphere_impact() < MIN_BIOSPHERE_VIABILITY {
      // PRÓG NIE OSIĄGNIĘTY!
      return Err(SystemHalt::ViolationOfLife);
  }

  // Bezpieczne otwarcie Mostu Koherencji
  return Ok(quantum_bridge::open_channel());
}
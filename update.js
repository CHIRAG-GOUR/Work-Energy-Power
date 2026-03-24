const fs = require('fs');

const jsxContent = \import React from 'react';
import { Link } from 'react-router-dom';

const ChapterOneThree = () => {
  return (
    <div className="chapter-container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fffcf2', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to Modules</Link>
      
      <div className="glass-card fade-in" style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '1.5rem', border: '4px solid #fde68a' }}>
        <p><meta charSet="utf-8"/></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Chapter 3: WORK DONE BY A CONSTANT FORCE</b></p>
        <p dir="ltr">
            <b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2"><a href="https://youtu.be/d6MhIBpmJnE">Work Done by a Constant Force</a> </b>
        </p>

        <div style={{ margin: '2rem 0' }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/d6MhIBpmJnE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '1rem' }}></iframe>
        </div>

        <p dir="ltr"><img height="270" src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-1.png" width="434" style={{maxWidth: '100%', height: 'auto', borderRadius: '1rem'}} /><b> v</b></p>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">The Mathematical Definition of Work</b></p>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">When a constant force (F) acts on an object and moves it through a distance (s) in the same direction as the force, the work done (W) is calculated as:</b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Work done = force &times; displacement</b></p>

        <p dir="ltr"><img height="58" src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-2.png" width="197" style={{maxWidth: '100%', height: 'auto', borderRadius: '0.5rem'}}/></p>

        <p>&nbsp;</p>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Key Characteristics of Work</b></h3>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Scalar Quantity: Work has magnitude only, no direction. Even though force and displacement are vectors, their product (work) is just a value.</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">The Unit (The Joule): The standard unit is the Newton-metre (N m), which is renamed the Joule (J).<br />
            Definition of 1 Joule: 1 J is the work done when a force of 1N displaces an object by 1 m in the direction of the force.</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Magnitude only: Work is a scalar quantity; it tells us how much energy was transferred, but work itself doesn&#39;t have a &quot;direction&quot; (unlike force)</b></p>
            </li>
        </ul>

        <h2 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Analyzing the &quot;Zero Work&quot; Conditions</b></h2>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-3.png" style={{ width: '197px', height: '58px', maxWidth: '100%' }} /></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Looking at the above equation, it becomes clear that work is a &quot;team effort&quot; between force and displacement. If either one is missing, the total work collapses to zero.</b></p>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">1. What if Force (F) is zero?</b></h3>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">If no external force is applied (F = 0), then </b></p>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-4.png" style={{ width: '148px', height: '46px', maxWidth: '100%' }} /></p>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example: An object sliding at a constant velocity on a frictionless surface in deep space. It is moving, but since no force is pushing it, no work is being done on it.</b></p>
            </li>
        </ul>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">2. What if Displacement (s) is zero?</b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">If you apply a force but the object doesn&#39;t budge (s = 0), then </b></p>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-5.png" style={{ width: '157px', height: '55px', maxWidth: '100%' }} /></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example: Pushing against a brick wall. You might sweat and burn calories (internal biological work), but the wall hasn&#39;t moved, so you&#39;ve done zero work on the wall.</b></p>

        <p>&nbsp;</p>

        <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '1rem'}}>
            <colgroup>
                <col width="82" />
                <col width="142" />
                <col width="128" />
                <col width="179" />
            </colgroup>
            <tbody>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Force (F)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Displacement (s)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Work Done (W)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Real-world Context</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Present</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Present</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Positive</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Pulling a wagon.</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Zero</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Present</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Zero</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Coasting in a vacuum.</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Present</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Zero</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Zero</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Holding a heavy box still.</b></td>
                </tr>
            </tbody>
        </table>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example : A force of 5 N is acting on an object. The object is displaced through 2 m in the direction of the force (Fig.). If the force acts on the object all through the displacement, then work done is 5 N &times; 2 m =10 N m or 10 J.</b></p>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-6.png" style={{ width: '401px', height: '77px', maxWidth: '100%' }} /></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Question </b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">1. A force of 7 N acts on an object. The displacement is, say 8 m, in the direction of the force (Fig. ). Let us take it that the force acts on the object through the displacement. What is the work done in this case?</b></p>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-7.png" style={{ width: '383px', height: '70px', maxWidth: '100%' }} /></p>

        <h2 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">The Role of Direction: Positive vs. Negative Work</b></h2>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-8.png" style={{ width: '744px', height: '485px', maxWidth: '100%' }} /></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2"><a href="https://youtu.be/WL7__D14kGc">https://youtu.be/WL7__D14kGc</a> </b></p>

        <div style={{ margin: '2rem 0' }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/WL7__D14kGc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '1rem' }}></iframe>
        </div>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">The relationship between the direction of the force and the direction of movement determines the &quot;sign&quot; of the work done.</b></p>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">1. Positive Work (+)</b></h3>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">When the force acts in the same direction as the displacement.</b></p>

        <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-9.png" style={{ width: '365px', height: '168px', maxWidth: '100%' }} /></p>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example: A baby pulling a toy car forward. The pull and the movement are both forward.</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Effect: Energy is added to the object, usually speeding it up.</b></p>
            </li>
        </ul>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">2. Negative Work (-)</b></h3>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">When the force acts in the opposite direction to the displacement (an angle of 180&deg;).</b></p>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example: Applying brakes to a moving car or a &quot;retarding force&quot; to stop a sliding object. The object moves forward, but the force pulls backward.</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Formula: W = Fx (-s) or W = -Fs.</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Effect: Energy is removed from the object, usually slowing it down.</b></p>
            </li>
        </ul>

        <p>&nbsp;</p>

        <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '1rem'}}>
            <colgroup>
                <col width="286" />
                <col width="114" />
                <col width="142" />
            </colgroup>
            <tbody>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Direction of Force vs. Displacement</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Type of Work</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Mathematical Sign</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Same Direction (0&deg;)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Positive</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">+W</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Opposite Direction (180&deg;)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Negative</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">-W</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Perpendicular (90&deg;)</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Zero</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">0</b></td>
                </tr>
            </tbody>
        </table>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Activity </b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">&bull; Lift an object up. Work is done by the force exerted by you on the object. The object moves upwards. The force you exerted is in the direction of displacement. However, there is the force of gravity acting on the object.</b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">&bull; Which one of these forces is doing positive work? </b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">&bull; Which one is doing negative work?</b></p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">&bull; Give reasons. </b></p>

        <p>&nbsp;</p>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">The Force Exerted by You (Applied Force)</b></h3>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Type of Work: Positive Work (+W)</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Reason: You are pulling or pushing the object upwards, and the object is moving upwards. Since the force (F) and the displacement (s) are in the same direction (0&deg;), you are adding energy to the object.</b></p>
            </li>
        </ul>

        <h3 dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">2. The Force of Gravity</b></h3>

        <ul>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Type of Work: Negative Work (-W)</b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Reason: Gravity always pulls objects downwards toward the Earth&#39;s center. However, the object is being displaced upwards. Since the force of gravity and the displacement are in opposite directions (180&deg;), gravity is trying to &quot;resist&quot; the motion, effectively removing energy from the object&#39;s upward climb.</b></p>
            </li>
        </ul>

        <p>&nbsp;</p>

        <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '1rem'}}>
            <colgroup>
                <col width="92" />
                <col width="188" />
                <col width="204" />
                <col width="99" />
            </colgroup>
            <tbody>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Force</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Direction of Force</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Direction of Displacement</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Type of Work</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Your Hand</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Upward&uarr;</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Upward &uarr;</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Positive</b></td>
                </tr>
                <tr>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Gravity</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Downward &darr;</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Upward &uarr;</b></td>
                    <td style={{border: '2px solid #cbd5e1', padding: '0.5rem'}}><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Negative</b></td>
                </tr>
            </tbody>
        </table>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Example </b></p>
        <p>&nbsp;</p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">A porter lifts a luggage of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done by him on the luggage. Solution: Mass of luggage, m = 15 kg and displacement, s = 1.5 m. </b></p>
        <p>&nbsp;</p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Solution: Mass of luggage, m = 15 kg and displacement, s = 1.5 m.</b></p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Work done, W = F &times; s = mg &times; s</b></p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">15 kg &times; 10 m s-2 &times; 1.5 m</b></p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">= 225 kg m s-2 m </b></p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">= 225 N m = 225 J </b></p>
        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">Work done is 225 J.</b></p>

        <p>&nbsp;</p>

        <p dir="ltr"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">Questions: </b></p>

        <ol>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2\">When do we say that work is done? </b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">2. Write an expression for the work done when a force is acting on an object in the direction of its displacement. </b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">3. Define 1 J of work. </b></p>
            </li>
            <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation"><b id="docs-internal-guid-952f2458-7fff-7086-79bd-7343b1e625c2">4. A pair of bullocks exerts a force of 140 N on a plough. The field being ploughed is 15 m long. How much work is done in ploughing the length of the field?</b></p>
            </li>
        </ol>
      </div>

    </div>
  );
};

export default ChapterOneThree;
\;

fs.writeFileSync('src/pages/ChapterOneThree.jsx', jsxContent);
